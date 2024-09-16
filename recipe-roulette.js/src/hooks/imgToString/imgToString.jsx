export function useImageToString() {
    const imgToString = (imageUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = "Anonymous" // Per evitare problemi di CORS
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                const dataURL = canvas.toDataURL("image/png")
                resolve(dataURL.split(",")[1]) // Restituisce solo la parte Base64
            }
            img.onerror = (error) => reject(error)
            img.src = imageUrl
        })
    }
    return { imgToString }
}
