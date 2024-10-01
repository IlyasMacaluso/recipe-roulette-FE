import { IcoButton } from "../Buttons/IcoButton/IcoButton";
import { Button } from "../Buttons/Button/Button";

import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import step1Img from "../../assets/images/tutorial/Appreciation-bro.svg";
import step2Img from "../../assets/images/tutorial/Bullet journal-bro.svg";
import step3Img from "../../assets/images/tutorial/eating a variety of foods-bro.svg";
import step4Img from "../../assets/images/tutorial/Hamburger-bro.svg";
import step5Img from "../../assets/images/tutorial/healthy food-bro.svg";
import step6Img from "../../assets/images/tutorial/Notes-bro.svg";

import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage";
import { useTutorial } from "../../hooks/useTutorial/useTutorial";

import styles from "./Tutorial.module.scss";

export function Tutorial({ setShowTutorial = null, checkbox = false }) {
  const { setValue } = useLocalStorage();
  const {
    tutorialStep,
    setTutorialStep,
    rememberShowTutorial,
    setRememberShowTutorial,
  } = useTutorial();

  return (
    <div className={styles.bgOverlay}>
      <div className={styles.tutorial}>
        <header>
          <h1>Tutorial</h1>
          <div className={styles.itemsRight}>
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
              <p className={styles.text}>
                Tap "Shuffle" to swap ingredients with new random ones
              </p>
              <img src={step1Img} alt="" />
            </div>
          )}

          {tutorialStep === 2 && (
            <div className={styles.stepBody}>
              <h2>Step 2</h2>
              <p className={styles.text}>
                Add or remove ingredients to your liking
              </p>
              <img src={step2Img} alt="" />
            </div>
          )}

          {tutorialStep === 3 && (
            <div className={styles.stepBody}>
              <h2>Step 3</h2>
              <p className={styles.text}>Lock ingredients you want to keep</p>
              <img src={step3Img} alt="" />
            </div>
          )}

          {tutorialStep === 4 && (
            <div className={styles.stepBody}>
              <h2>Step 4</h2>
              <p className={styles.text}>
                Keep doing that until the ingredients you see on the screen
                satisfy you
              </p>
              <img src={step4Img} alt="" />
            </div>
          )}

          {tutorialStep === 5 && (
            <div className={styles.stepBody}>
              <h2>Step 5</h2>
              <p className={styles.text}>
                Use filters to customise your results to your liking
              </p>
              <img src={step5Img} alt="" />
            </div>
          )}

          {tutorialStep === 6 && (
            <div className={styles.stepBody}>
              <h2>Step 6</h2>
              <p className={styles.text}>
                Tap "Generate Recipes" to create recipes with ingredients and
                preferences you selected!{" "}
              </p>
              <img src={step6Img} alt="" />
            </div>
          )}
        </section>

        <section className={styles.bottomItems}>
          {checkbox && (
            <div className={styles.rememberMe}>
              <label htmlFor="rememberShowTutorial">
                Don't show this again
              </label>
              <input
                className={styles.checkbox}
                id="rememberShowTutorial"
                type="checkbox"
                value={rememberShowTutorial}
                onClick={() => setRememberShowTutorial((b) => !b)}
              />
            </div>
          )}

          <div className={styles.navigationButtonsWrapper}>
            {tutorialStep !== 1 && (
              <Button
                label="Previous"
                iconLeft={<NavigateBeforeIcon fontSize="small" />}
                action={() => setTutorialStep((prev) => prev - 1)}
              />
            )}
            {tutorialStep !== 6 && (
              <Button
                label="Next"
                iconRight={<NavigateNextIcon fontSize="small" />}
                action={() => setTutorialStep((prev) => prev + 1)}
                style="primary"
                width="fill"
              />
            )}
            {tutorialStep === 6 && (
              <Button
                label="Done!"
                action={() => {
                  if (rememberShowTutorial) {
                    setValue("showTutorial", false);
                  }
                  setShowTutorial(false);
                }}
                style="primary"
                width="fill"
                iconLeft={<DoneAllIcon fontSize="small" />}
              />
            )}
          </div>
          <Button
            iconRight={<SkipNextIcon fontSize="small" />}
            action={() => {
              if (rememberShowTutorial) {
                setValue("showTutorial", false);
              }
              setShowTutorial(false);
            }}
            label="Skip"
          />
        </section>
      </div>
    </div>
  );
}
