import { useEffect, useState } from "react"

export function useTutorial(showTutorialAgain) {
    const [showTutorial, setShowTutorial] = useState(false)
    const [rememberShowTutorial, setRememberShowTutorial] = useState(false)
    const [tutorialStep, setTutorialStep] = useState(1)

    useEffect(() => {
        if (showTutorialAgain === false) {
            setShowTutorial(false)
        } else {
            setShowTutorial(true)
        }
    }, [])

    return { showTutorial, setShowTutorial, tutorialStep, setTutorialStep, rememberShowTutorial, setRememberShowTutorial }
}
