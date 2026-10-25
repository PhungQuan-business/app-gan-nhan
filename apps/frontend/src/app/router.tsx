import { LoginPage } from '../pages/auth/login-page'
import { SignupPage } from '../pages/auth/signup-page'
import { VerifyOtpPage } from '../pages/auth/verify-otp-page'
import { LandingPage } from '../pages/landing/landing-page'

export function AppRouter() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  switch (path) {
    case '/login':
      return <LoginPage />
    case '/signup':
      return <SignupPage />
    case '/verify-otp':
      return <VerifyOtpPage />
    default:
      return <LandingPage />
  }
}
