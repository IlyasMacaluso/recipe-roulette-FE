import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { Button } from "../Buttons/Button/Button"
import CloseIcon from "@mui/icons-material/Close"

import step1Img from "../../assets/images/tutorial/Appreciation-bro.svg"
import step2Img from "../../assets/images/tutorial/Bullet journal-bro.svg"
import step3Img from "../../assets/images/tutorial/eating a variety of foods-bro.svg"
import step4Img from "../../assets/images/tutorial/Hamburger-bro.svg"
import step5Img from "../../assets/images/tutorial/healthy food-bro.svg"
import step6Img from "../../assets/images/tutorial/Notes-bro.svg"

import styles from "./Tutorial.module.scss"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"

export function Tutorial({
    setShowTutorial = null,
    tutorialStep = null,
    setTutorialStep = null,
    rememberShowTutorial = false,
    setRememberShowTutorial = null,
}) {
    console.log(tutorialStep)
    const { setValue } = useLocalStorage()

    return (
        <div className={styles.bgOverlay}>
            <div className={styles.tutorial}>
                <header>
                    <h2>Tutorial</h2>
                    <div className={styles.rightItems}>
                        <IcoButton
                            action={() => setShowTutorial && setShowTutorial(false)}
                            style="transparent"
                            icon={<CloseIcon fontSize="small" />}
                        />
                    </div>
                </header>

                <section className={styles.tutorialStep}>
                    {tutorialStep === 1 && (
                        <div className={styles.stepBody}>
                            <h2>Step 1</h2>
                            <p>Tap "Shuffle" to swap ingredients with new random ones</p>
                            <img src={step1Img} alt="" />
                        </div>
                    )}

                    {tutorialStep === 2 && (
                        <div className={styles.stepBody}>
                            <h2>Step 2</h2>
                            <p>Add or remove ingredients to your liking</p>
                            <img src={step2Img} alt="" />
                        </div>
                    )}

                    {tutorialStep === 3 && (
                        <div className={styles.stepBody}>
                            <h2>Step 3</h2>
                            <p>Lock ingredients you want to keep</p>
                            <img src={step3Img} alt="" />
                        </div>
                    )}

                    {tutorialStep === 4 && (
                        <div className={styles.stepBody}>
                            <h2>Step 4</h2>
                            <p>Keep doing that until the ingredients you see on the screen satisfy you</p>
                            <img src={step4Img} alt="" />
                        </div>
                    )}

                    {tutorialStep === 5 && (
                        <div className={styles.stepBody}>
                            <h2>Step 5</h2>
                            <p>Use filters to customise your results to your liking</p>
                            <img src={step5Img} alt="" />
                        </div>
                    )}

                    {tutorialStep === 6 && (
                        <div className={styles.stepBody}>
                            <h2>Step 6</h2>
                            <p>Tap "Generate Recipes" to create recipes with those ingredients! </p>
                            <img src={step6Img} alt="" />
                        </div>
                    )}
                </section>

                <section className={styles.bottomItems}>
                    <div>
                        <label htmlFor="rememberShowTutorial"> Don't show this again </label>
                        <input
                            id="rememberShowTutorial"
                            type="checkbox"
                            value={rememberShowTutorial}
                            onClick={() => setRememberShowTutorial((b) => !b)}
                        />
                    </div>
                    <div className={styles.navigationButtonsWrapper}>
                        {tutorialStep !== 1 && <Button action={() => setTutorialStep((prev) => prev - 1)} label="Previous" />}
                        {tutorialStep !== 6 && (
                            <Button action={() => setTutorialStep((prev) => prev + 1)} style="primary" width="fill" label="Next" />
                        )}
                        {tutorialStep === 6 && (
                            <Button
                                action={() => {
                                    if (rememberShowTutorial) {
                                        setValue("showTutorial", false)
                                    }
                                    setShowTutorial(false)
                                }}
                                style="primary"
                                width="fill"
                                label="Get started!"
                            />
                        )}
                    </div>
                    <Button
                        action={() => {
                            if (rememberShowTutorial) {
                                setValue("showTutorial", false)
                            }
                            setShowTutorial(false)
                        }}
                        label="Skip"
                    />
                </section>
            </div>
        </div>
    )
}
