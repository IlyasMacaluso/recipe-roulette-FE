export function useDebounce() {
    function debounce(func, wait) {
        let timeout
        return function (...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                func(...args)
            }, wait)
        }
    }

    return { debounce }
}