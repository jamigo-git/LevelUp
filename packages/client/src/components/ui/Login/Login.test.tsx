import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/utils/test-utils'
import { message } from 'antd'
import { Login } from './Login'

jest.mock('antd', () => {
  const originalModule = jest.requireActual('antd')
  return {
    ...originalModule,
    message: {
      error: jest.fn(),
      success: jest.fn(),
    },
  }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => {
      const translations: Record<string, string> = {
        'Login.loginButtonText': 'Авторизоваться',
        'Login.loginLabel': 'Логин',
        'Login.passwordLabel': 'Пароль',
      }
      return translations[str] || str
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

jest.mock('@/components/ui/common/OAuthButton', () => {
  return {
    __esModule: true,
    OAuthButton: () => <button type='button'>Mock OAuthButton</button>,
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Login Component', () => {
  test('displays error messages with empty fields', async () => {
    renderWithProviders(<Login />)
    const submitButton = screen.getByRole('button', { name: 'Авторизоваться' })

    await userEvent.click(submitButton)

    const loginFieldError = await screen.findByText('Пожалуйста введите логин!')
    const passwordFieldError = await screen.findByText('Пожалуйста введите пароль!')

    expect(loginFieldError).toBeInTheDocument()
    expect(passwordFieldError).toBeInTheDocument()
  })

  test('displays error message when login fails', async () => {
    renderWithProviders(<Login />)
    const emailInput = screen.getByLabelText('Логин')
    const passwordInput = screen.getByLabelText('Пароль')
    const submitButton = screen.getByRole('button', { name: 'Авторизоваться' })

    // Enter invalid email and password
    await userEvent.type(emailInput, 'invalid@email.com')
    await userEvent.type(passwordInput, 'InvalidPassword1234')
    await userEvent.click(submitButton)

    expect(message.error).toHaveBeenCalledTimes(1)
  })

  test.skip('displays success message when login is successful', async () => {
    renderWithProviders(<Login />)
    const emailInput = screen.getByLabelText('Логин')
    const passwordInput = screen.getByLabelText('Пароль')
    const submitButton = screen.getByRole('button', { name: 'Авторизоваться' })

    // Enter valid email and password
    await userEvent.type(emailInput, 'valid@email.com')
    await userEvent.type(passwordInput, 'Password1234')
    await userEvent.click(submitButton)

    expect(message.success).toHaveBeenCalledTimes(1)
  })
})
