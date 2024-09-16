import { Sidebar } from "../../../components/Sidebar/Sidebar"

import layout from "../../../assets/scss/pageLayout/pageFH.module.scss"
import styles from "./FoodPreferences.module.scss"

export function FoodPreferences() {
    return (
        <div className={`${layout.pageFH}  ${layout.noPadding} ${styles.body}`}>
             
            <Sidebar
                showBlacklist={true}
                positionUnfixed={true}
                removeBgOverlay={true}
                filtersName="recipePreferences"
                sidebarState={true}
            />

        </div>
    )
}
