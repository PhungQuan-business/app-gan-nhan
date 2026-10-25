import { LoginPage } from '../pages/auth/login-page'
import { CreateAccountPage } from '../pages/auth/create-account-page'
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
        case '/create-account':
            return <CreateAccountPage />
        default:
            return <LandingPage />
    }
}
