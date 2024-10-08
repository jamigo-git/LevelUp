import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { EXTERNAL_API_URL } from './src/utils/constants'
import { dbConnect } from './src/config/db'
import { errorLogger, requestLogger } from './src/middlewares/logger'
import { handleError } from './src/middlewares/handleError'
import router from './src/routes'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const port = Number(process.env.SERVER_PORT) || 3001
const corsOptions = {
  origin: '*',
}

const app = express()

app.use(
  '/yandex',
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: EXTERNAL_API_URL,
    pathRewrite: {
      '^/yandex': '',
    },
  })
)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(requestLogger)
app.use('/api', router)
app.use(errorLogger)
app.use(handleError)
;(async function () {
  await dbConnect()
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
})()
