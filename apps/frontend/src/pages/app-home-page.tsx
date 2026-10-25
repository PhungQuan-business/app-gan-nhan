type AuthUser = {
    name: string | null
    email: string
}

function readAuthUser(): AuthUser | null {
    const rawUser = sessionStorage.getItem('authUser')
    if (!rawUser) return null

    try {
        const user: unknown = JSON.parse(rawUser)
        if (
            typeof user === 'object' &&
            user !== null &&
            'email' in user &&
            typeof user.email === 'string' &&
            'name' in user &&
            (typeof user.name === 'string' || user.name === null)
        ) {
            return { email: user.email, name: user.name }
        }
    } catch {
        return null
    }

    return null
}

export function AppHomePage() {
    const user = readAuthUser()

    function handleLogout() {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('authUser')
        window.location.assign('/login')
    }

    return (
        <main className="destination-page">
            <section className="app-home-card" aria-labelledby="app-home-heading">
                <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
                <h1 id="app-home-heading">Main app</h1>
                <p className="app-home-description">
                    {user ? `Welcome${user.name ? `, ${user.name}` : ''}. You are signed in as ${user.email}.` : 'Your workspace is ready.'}
                </p>
                <p className="app-home-placeholder">Application workspace coming soon.</p>
                {user && (
                    <button className="secondary-button app-home-logout" type="button" onClick={handleLogout}>
                        Log out
                    </button>
                )}
            </section>
        </main>
    )
}