import { useState } from "react"

export function useForm(initialValue) {
    const [data, setData] = useState(initialValue)
    const [showText, setShowText] = useState(false)

    function handleInputChange(e) {
        const type = e.target.type
        const name = e.target.name
        const value = type === "checkbox" ? e.target.checked : e.target.value

        setData((prev) => ({ ...prev, [name]: value }))
    }

    function handleShowText() {
        setShowText(!showText)
    }
    return {
        data,
        showText,
        setData,
        handleShowText,
        handleInputChange,
    }
}
