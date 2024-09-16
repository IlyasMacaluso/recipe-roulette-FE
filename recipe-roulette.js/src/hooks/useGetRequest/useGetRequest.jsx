import axios from "axios"

export function useGetRequest() {
    const getRequest = async (url) => {
        try {
            if (!url) {
                throw new Error(`Request error: missing URL`)
            }

            const res = await axios.get(url)

            if (res.status !== 200) {                
                throw new Error(`Network error, ${res?.data.msg || "Bad request"}`)
            }

            return res.data
        } catch (error) {
            console.log(error)
            throw new Error(error || "Something went wrong")
        }
    }

    return {  getRequest }
}
