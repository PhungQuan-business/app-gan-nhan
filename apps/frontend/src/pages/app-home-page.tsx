import { useRef, useState, type ChangeEvent } from 'react'
import { uploadDataset, type DatasetUploadResult } from '../features/data/services/data.api'

type AuthUser = {
    name: string | null
    email: string
}

type AppPage = {
    id: string
    label: string
    group: string
}

const appPages: AppPage[] = [
    { id: 'upload-data', label: 'Upload Data', group: 'Data' },
    { id: 'datasets', label: 'Datasets', group: 'Data' },
    { id: 'annotation', label: 'Annotation', group: 'Data' },
    { id: 'training', label: 'Training', group: 'Models' },
    { id: 'evaluation', label: 'Evaluation', group: 'Models' },
    { id: 'endpoints', label: 'Endpoints', group: 'Deploy' },
]

const navigationGroups = ['Data', 'Models', 'Deploy']

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

function getSelectedPage(): AppPage {
    const selectedId = new URLSearchParams(window.location.search).get('view') ?? 'upload-data'
    return appPages.find((page) => page.id === selectedId) ?? appPages[0]
}

function UploadDataPage() {
    const zipInputRef = useRef<HTMLInputElement>(null)
    const folderInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState<DatasetUploadResult | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedFiles(Array.from(event.currentTarget.files ?? []))
        setResult(null)
        setErrorMessage(null)
    }

    async function handleUpload() {
        if (!selectedFiles.length || uploading) return
        setUploading(true)
        setResult(null)
        setErrorMessage(null)
        try {
            setResult(await uploadDataset(selectedFiles))
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'The dataset could not be uploaded.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <section className="workspace-intro" aria-labelledby="workspace-page-title">
                <p className="workspace-eyebrow">DATA / INGESTION</p>
                <h1 id="workspace-page-title">Upload Data</h1>
                <p>Upload a Roboflow YOLO export as a ZIP archive or select the dataset folder from this computer.</p>
            </section>

            <section className="upload-panel" aria-label="Select data files">
                <div className="upload-symbol" aria-hidden="true">↑</div>
                <h2>Select files to get started</h2>
                <p>Choose a dataset ZIP or folder containing data.yaml and exported images.</p>
                <input ref={zipInputRef} type="file" accept=".zip,application/zip" hidden onChange={handleFileChange} />
                <input
                    ref={folderInputRef}
                    type="file"
                    multiple
                    hidden
                    {...({ webkitdirectory: '', directory: '' } as Record<string, string>)}
                    onChange={handleFileChange}
                />
                <div className="upload-actions">
                    <button className="workspace-primary-button" type="button" onClick={() => zipInputRef.current?.click()}>
                        Choose ZIP
                    </button>
                    <button className="secondary-button workspace-folder-button" type="button" onClick={() => folderInputRef.current?.click()}>
                        Choose folder
                    </button>
                </div>
                <span className="upload-supported-types">Maximum upload size: 15 GB</span>
                {selectedFiles.length > 0 && (
                    <p className="selected-files" role="status">
                        {selectedFiles.length === 1 ? `${selectedFiles[0].name} selected` : `${selectedFiles.length} files selected`}
                    </p>
                )}
                {selectedFiles.length > 0 && (
                    <button className="workspace-primary-button upload-submit" type="button" disabled={uploading} onClick={handleUpload}>
                        {uploading ? 'Uploading…' : 'Process dataset'}
                    </button>
                )}
                {errorMessage && <p className="upload-error" role="alert">{errorMessage}</p>}
                {result && (
                    <div className="upload-result" role="status">
                        <strong>{result.errors.length ? 'Dataset needs attention' : 'Dataset processed successfully'}</strong>
                        <span>{result.images.length} images across {result.splits.length} splits</span>
                        {result.errors.map((item) => <span className="upload-result-error" key={`${item.code}-${item.path ?? item.message}`}>{item.message}</span>)}
                        {result.warnings.map((item) => <span key={`${item.code}-${item.path ?? item.message}`}>{item.message}</span>)}
                    </div>
                )}
            </section>
        </>
    )
}

function PlaceholderPage({ page }: { page: AppPage }) {
    return (
        <section className="workspace-intro placeholder-page" aria-labelledby="workspace-page-title">
            <p className="workspace-eyebrow">{page.group.toUpperCase()} / WORKSPACE</p>
            <h1 id="workspace-page-title">{page.label}</h1>
            <div className="placeholder-notice">
                <span className="placeholder-indicator" aria-hidden="true" />
                <div>
                    <h2>{page.label} is coming soon</h2>
                    <p>This destination is part of the project workspace and will be available in a future update.</p>
                </div>
            </div>
        </section>
    )
}

export function AppHomePage() {
    const user = readAuthUser()
    const selectedPage = getSelectedPage()

    function handleLogout() {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('authUser')
        window.location.assign('/login')
    }

    return (
        <div className="workspace-shell">
            <aside className="workspace-sidebar" aria-label="Project navigation">
                <a className="workspace-brand" href="/app" aria-label="Protocol home">
                    <span className="workspace-brand-mark" aria-hidden="true">P</span>
                    <span>Protocol</span>
                </a>

                <div className="project-context">
                    <span className="project-avatar" aria-hidden="true">A</span>
                    <span className="project-copy">
                        <span className="project-label">CURRENT PROJECT</span>
                        <span className="project-name">Atlas Research</span>
                    </span>
                    <span className="project-chevron" aria-hidden="true">⌄</span>
                </div>

                <nav className="workspace-navigation" aria-label="Workspace sections">
                    {navigationGroups.map((group) => (
                        <div className="navigation-group" key={group}>
                            <h2>{group}</h2>
                            {appPages.filter((page) => page.group === group).map((page) => (
                                <a
                                    className={`workspace-nav-link${selectedPage.id === page.id ? ' is-active' : ''}`}
                                    href={`/app?view=${page.id}`}
                                    key={page.id}
                                    aria-current={selectedPage.id === page.id ? 'page' : undefined}
                                >
                                    <span className="navigation-marker" aria-hidden="true" />
                                    {page.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="workspace-sidebar-footer">
                    <span className="workspace-status-dot" aria-hidden="true" />
                    <span>Workspace ready</span>
                </div>
            </aside>

            <div className="workspace-main">
                <header className="workspace-topbar">
                    <div className="workspace-breadcrumb">
                        <span>Atlas Research</span>
                        <span aria-hidden="true">/</span>
                        <strong>{selectedPage.label}</strong>
                    </div>
                    <div className="workspace-account">
                        {user && (
                            <>
                                <span className="workspace-user-name">{user.name || user.email}</span>
                                <button className="workspace-logout" type="button" onClick={handleLogout}>Log out</button>
                            </>
                        )}
                    </div>
                </header>

                <div className={`workspace-content${selectedPage.id === 'upload-data' ? ' has-context-panel' : ''}`}>
                    <main className="workspace-page">
                        {selectedPage.id === 'upload-data'
                            ? <UploadDataPage />
                            : <PlaceholderPage page={selectedPage} />}
                    </main>

                    {selectedPage.id === 'upload-data' && (
                        <aside className="workspace-context-panel" aria-label="Upload guidance">
                            <h2>Before you upload</h2>
                            <p>Keep source data organized so it is easier to label and review.</p>
                            <ul>
                                <li>Use one record per row or line.</li>
                                <li>Include a clear text or content field.</li>
                                <li>Remove sensitive information you do not need.</li>
                            </ul>
                            <div className="context-panel-divider" />
                            <span className="context-panel-label">SUPPORTED FORMATS</span>
                            <p className="context-formats">CSV · JSONL · JSON · Parquet · TXT</p>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}
