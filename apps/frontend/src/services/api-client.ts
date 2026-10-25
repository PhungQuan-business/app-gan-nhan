const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api/v2').replace(/\/$/, '')

type JsonObject = Record<string, unknown>

function isJsonObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null
}

export async function postJson(path: string, body: JsonObject): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    let result: unknown
    try {
        result = await response.json()
    } catch {
        throw new Error('The server returned an invalid response.')
    }

    if (!response.ok) {
        const message =
            isJsonObject(result) && typeof result.message === 'string'
                ? result.message
                : 'The request could not be completed.'
        throw new Error(message)
    }

    return result
}
