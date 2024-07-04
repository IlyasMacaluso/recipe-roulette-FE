import { useEffect, useState } from "react"

export const useShakeAnimation = () => {
    const [animationState, setAnimationState] = useState({
        isAnimating: false,
        queueAnimation: false,
    })

    useEffect(() => {
        const { isAnimating, queueAnimation } = animationState

        if (!isAnimating && queueAnimation) {
            setAnimationState((prevState) => ({
                ...prevState,
                isAnimating: true,
            }))

            setTimeout(() => {
                setAnimationState((prevState) => ({
                    ...prevState,
                    isAnimating: false,
                    queueAnimation: false,
                }))
            }, 355) // Tempo di durata dell'animazione (450 ms)
        }
    }, [animationState])

    const handleAnimation = () => {
        const { isAnimating, queueAnimation } = animationState

        if (isAnimating || queueAnimation) return // Se è già in animazione o in coda, esci

        setAnimationState((prevState) => ({
            ...prevState,
            queueAnimation: true,
        }))
    }

    return { handleAnimation, animationState }
}
