import { renderToString } from 'react-dom/server'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import { HelmetProvider } from 'react-helmet-async'
import { rootReducer } from './store'
import { createFetchRequest } from './entry-server.utils'
import { staticHandler } from './routing/staticHandler'
import forumApiService from './store/slices/forumApi/forumApiService'
import topicReactionApiService from './store/slices/topicReactionsApi/topicReactionsApiService'

dayjs.locale('ru')

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = staticHandler

  // Создаёт node Request из ExpressRequest.
  const fetchRequest = createFetchRequest(req)

  // Создаёт контекст для роутера, в нем будет находиться информация, которая
  // доступна на клиенте «из коробки».
  const context = await query(fetchRequest)

  // Если context — это Response, то приходит к выводу, что сейчас идёт процесс
  // редиректа и поэтому выбрасывает исключение.
  if (context instanceof Response) {
    throw new Error('Redirect process in progress')
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(forumApiService.middleware, topicReactionApiService.middleware),
  })

  // Создёт статический роутер, чтобы на сервере можно было отрендерить HTML-разметку.
  const router = createStaticRouter(dataRoutes, context)

  const helmetContext = {}

  return {
    html: renderToString(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouterProvider router={router} context={context} />
        </HelmetProvider>
      </Provider>
    ),
    helmetContext,
    initialState: store.getState(),
  }
}
