/// <reference types="vite/client" />

interface Document {
    webkitFullscreenElement: Element | null
}

interface HTMLElement {
    webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>
    webkitExitFullscreen(): Promise<void>
}
