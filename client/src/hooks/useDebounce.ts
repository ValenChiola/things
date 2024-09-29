export const useDebounce =
    <T extends (...args: any[]) => any>(fn: T, milliseconds = 1000) =>
    (...args: Parameters<typeof fn>) => {
        window.timeout && clearTimeout(window.timeout)
        window.timeout = setTimeout(() => fn(...args), milliseconds)
    }

declare global {
    interface Window {
        timeout: number
    }
}
