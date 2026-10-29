const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api/v2').replace(/\/$/, '')

export type DatasetValidation = {
    code: string
    message: string
    path?: string
}

export type DatasetUploadResult = {
    datasetRoot: string
    config: Record<string, unknown>
    classes: string[]
    splits: Array<{ name: string; path: string; imageCount: number }>
    images: Array<{ filename: string; path: string; split: string; patientProfile: string; collectionDate: string; angle: string; annotation: string | null }>
    collectionSessions: Array<{ patientProfile: string; collectionDate: string; imageCount: number }>
    warnings: DatasetValidation[]
    errors: DatasetValidation[]
}

function uploadErrorMessage(result: unknown): string {
    if (typeof result === 'object' && result !== null && 'message' in result && typeof result.message === 'string') {
        return result.message
    }
    return 'The dataset could not be uploaded.'
}

export async function uploadDataset(files: File[]): Promise<DatasetUploadResult> {
    const totalSize = files.reduce((total, file) => total + file.size, 0)
    if (totalSize > 15_000_000_000) {
        throw new Error('The selected dataset exceeds the 15 GB upload limit.')
    }

    const formData = new FormData()
    for (const file of files) {
        const relativePath = Object.prototype.hasOwnProperty.call(file, 'webkitRelativePath')
            && typeof file.webkitRelativePath === 'string'
            && file.webkitRelativePath
            ? file.webkitRelativePath
            : file.name
        formData.append('files', file, relativePath)
    }

    const response = await fetch(`${API_BASE_URL}/data/dataset-upload`, {
        method: 'POST',
        body: formData,
    })

    let result: unknown
    try {
        result = await response.json()
    } catch {
        throw new Error('The server returned an invalid upload response.')
    }

    if (!response.ok) throw new Error(uploadErrorMessage(result))
    if (typeof result !== 'object' || result === null || !('data' in result)) {
        throw new Error('The server returned an invalid upload response.')
    }

    return result.data as DatasetUploadResult
}
