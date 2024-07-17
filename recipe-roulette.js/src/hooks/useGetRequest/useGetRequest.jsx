import axios from 'axios';

export function usePostRequest() {
    const postRequest = async (url, data) => {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return { postRequest };
}
