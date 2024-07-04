export const useSessionStorage = () => {
    const getSessionValue = (key, initialValue) => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    };

    const setSessionValue = (key, value) => {
        try {
            const valueToStore = value instanceof Function ? value(getValue(key)) : value;
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return { getSessionValue, setSessionValue };
};
