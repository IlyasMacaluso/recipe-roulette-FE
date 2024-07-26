export const useLocalStorage = () => {
    const getValue = (key, initialValue) => {
        try {
            const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : initialValue

        } catch (error) {
            console.error(error)
            return initialValue
        }
    }

    const setValue = (key, value) => {
        try {
            const valueToStore = value instanceof Function ? value(getValue(key)) : value
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    }

    return { getValue, setValue }
}
