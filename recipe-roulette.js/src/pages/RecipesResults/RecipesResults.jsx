import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import classes from "./RecipesResults.module.scss"
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useEffect, useMemo, useState } from "react"

export function RecipeResults({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()
    const { filteredRecipes } = useRecipesContext()
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    const searchFilteredRecipes = useMemo(() => {
        return filteredRecipes.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, filteredRecipes])

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <section className={classes.search}>
                {/* <IngredientSearch isFixed={true} /> */}
                <BaseSearch data={filteredRecipes} inputValue={inputValue} setInputValue={setInputValue} />
                <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<TuneOutlinedIcon fontSize="small" />} />
            </section>
            <div className={classes.subHeading}>
                <div className={classes.chipWrapper}>
                    <FilterChipRecipes label="All" />
                    <FilterChipRecipes label="30m" />
                    <FilterChipRecipes label="45m" />
                    <FilterChipRecipes label="60m +" />
                </div>
            </div>
                {searchFilteredRecipes && searchFilteredRecipes.length > 0 ? (
                    <section className={classes.recipesWrapper}>
                        {searchFilteredRecipes.map((recipe) => {
                            return (
                                <RecipeCard
                                    recipeId={recipe.id}
                                    key={recipe.id}
                                    title={recipe.title}
                                    image={recipe.image}
                                    attributes={recipe.attributes}
                                    isFav={recipe.isFavorited}
                                    preparation={recipe.preparation}
                                    ingredients={recipe.ingredients}
                                    isGlutenFree={recipe.isGlutenFree}
                                    isVegetarian={recipe.isVegetarian}
                                    isVegan={recipe.isVegan}
                                />
                            )
                        })}
                    </section>
                ) : (
                    <div className={classes.placeholder}>
                        <div className={classes.placeholderImage}>
                            <svg width="587" height="660" viewBox="0 0 587 660" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_289_2368)">
                                    <path
                                        d="M332.479 508C472.759 508 586.479 394.28 586.479 254C586.479 113.72 472.759 0 332.479 0C192.198 0 78.4786 113.72 78.4786 254C78.4786 394.28 192.198 508 332.479 508Z"
                                        fill="#CDE4C5"
                                    />
                                    <path
                                        d="M498.464 113.588H33.1706C32.1729 113.567 31.3813 112.741 31.4026 111.743C31.4233 110.775 32.2029 109.996 33.1706 109.975H498.464C499.461 109.997 500.253 110.823 500.232 111.82C500.211 112.788 499.431 113.568 498.464 113.588Z"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M339.893 174.473H211.268C201.606 174.473 193.774 182.304 193.774 191.966V191.966C193.774 201.627 201.606 209.459 211.268 209.459H339.893C349.554 209.459 357.386 201.627 357.386 191.966C357.386 182.304 349.554 174.473 339.893 174.473Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M128.175 244.445H422.985C432.647 244.445 440.479 252.277 440.479 261.939C440.479 271.6 432.647 279.432 422.985 279.432H128.175C118.514 279.432 110.682 271.6 110.682 261.939C110.682 252.277 118.514 244.445 128.175 244.445Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M128.175 314.418H422.985C432.647 314.418 440.479 322.25 440.479 331.911C440.479 341.573 432.647 349.404 422.985 349.404H128.175C118.514 349.404 110.682 341.573 110.682 331.911C110.682 322.25 118.514 314.418 128.175 314.418Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M91.6408 657.759L90.947 657.691C67.4063 655.263 46.1257 642.602 32.7586 623.073C29.0972 617.632 26.1356 611.751 23.9436 605.569L23.7329 604.979L24.3566 604.929C31.8036 604.33 39.4539 603.066 42.8525 602.465L20.9377 595.04L20.8022 594.389C19.503 588.285 22.0484 582.005 27.2307 578.528C32.4271 574.883 39.318 574.766 44.6348 578.233C47.0208 579.757 49.5164 581.266 51.9297 582.727C60.2229 587.743 68.7985 592.93 75.228 600.028C84.9775 611.006 89.2509 625.798 86.8579 640.283L91.6408 657.759Z"
                                        fill="#F2F2F2"
                                    />
                                    <path
                                        d="M171.3 646.861L182.1 646.86L187.239 605.198L171.297 605.199L171.3 646.861Z"
                                        fill="#A0616A"
                                    />
                                    <path
                                        d="M170.919 658.128L204.134 658.127V657.707C204.133 650.567 198.345 644.78 191.206 644.779L185.138 640.177L173.818 644.78L170.919 644.78L170.919 658.128Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M84.7411 616.945L93.3801 623.426L122.493 593.185L109.741 583.619L84.7411 616.945Z"
                                        fill="#A0616A"
                                    />
                                    <path
                                        d="M77.6745 625.73L104.243 645.662L104.496 645.326C108.78 639.614 107.624 631.511 101.913 627.226L99.8214 619.903L88.004 616.792L85.6847 615.052L77.6745 625.73Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M120.645 451.353C120.645 451.353 121.241 467.617 121.993 480.66C122.116 482.799 117.105 485.123 117.235 487.45C117.321 488.994 118.263 490.495 118.35 492.105C118.442 493.804 117.142 495.308 117.235 497.065C117.325 498.781 118.809 500.75 118.898 502.507C119.861 521.416 123.353 544.054 119.857 550.382C118.134 553.5 96.1713 596.706 96.1713 596.706C96.1713 596.706 108.408 615.061 111.904 608.943C116.522 600.862 152.11 563.055 152.11 555.835C152.11 548.625 160.344 494.582 160.344 494.582L166.085 526.564L168.717 532.901L167.89 536.621L169.591 541.641L169.683 546.609L171.339 555.835C171.339 555.835 166.357 627.717 169.163 629.719C171.977 631.729 185.604 635.339 187.212 631.729C188.812 628.119 199.223 556.71 199.223 556.71C199.223 556.71 200.901 523.985 202.719 493.568C202.824 491.803 204.065 489.67 204.161 487.931C204.275 485.912 203.488 483.29 203.593 481.332C203.707 479.085 204.703 477.503 204.799 475.353C205.542 458.738 201.372 438.504 200.043 436.511C196.031 430.498 192.421 425.691 192.421 425.691C192.421 425.691 138.386 407.937 123.947 425.977L120.645 451.353Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M174.538 284.104L153.117 279.82L143.121 293.386C124.468 311.727 124.187 327.914 127.517 353.86V390.275L125.107 414.687C125.107 414.687 116.575 432.533 125.375 436.687C134.174 440.842 191.973 440.488 197.492 438.829C203.01 437.171 198.227 435.135 196.778 427.405C194.056 412.886 195.876 419.889 196.064 415.267C198.749 348.953 192.493 321.729 191.858 314.573L180.964 294.814L174.538 284.104Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M287.439 337.571C285.207 341.801 279.968 343.42 275.738 341.188C275.287 340.95 274.857 340.672 274.455 340.359L228.195 369.732L228.328 353.74L273.267 327.661C276.468 324.072 281.972 323.758 285.561 326.959C288.564 329.637 289.34 334.024 287.439 337.571Z"
                                        fill="#A0616A"
                                    />
                                    <path
                                        d="M157.625 302.624L152.358 302.066C147.492 301.561 142.717 303.646 139.779 307.557C138.653 309.041 137.845 310.74 137.404 312.549L137.401 312.563C136.08 318.009 138.152 323.715 142.659 327.044L160.849 340.456C173.614 357.704 197.606 369.148 225.747 378.445L269.49 351.279L254.018 332.54L224.015 348.62L179.417 314.096L179.391 314.075L162.417 303.139L157.625 302.624Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M167.3 273.585C181.096 273.585 192.28 262.401 192.28 248.605C192.28 234.809 181.096 223.625 167.3 223.625C153.504 223.625 142.32 234.809 142.32 248.605C142.32 262.401 153.504 273.585 167.3 273.585Z"
                                        fill="#A0616A"
                                    />
                                    <path
                                        d="M167.877 273.59C167.676 273.597 167.474 273.602 167.272 273.607C167.186 273.831 167.093 274.053 166.985 274.271L167.877 273.59Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M174.732 249.298C174.772 249.544 174.832 249.787 174.912 250.023C174.879 249.775 174.818 249.532 174.732 249.298Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M192.599 224.694C191.57 227.887 190.653 223.837 187.27 224.566C183.201 225.442 178.467 225.141 175.134 222.647C170.17 219.004 163.736 218.023 157.911 220.022C152.21 222.039 142.658 223.461 141.172 229.323C140.656 231.361 140.451 233.573 139.199 235.262C138.104 236.738 136.377 237.58 134.933 238.717C130.055 242.554 133.783 253.456 136.092 259.217C138.4 264.978 143.695 269.174 149.517 271.324C155.15 273.404 161.263 273.77 167.272 273.607C168.317 270.896 167.866 267.766 167.003 264.956C166.07 261.914 164.687 258.978 164.297 255.82C163.907 252.662 164.764 249.074 167.412 247.31C169.846 245.688 173.807 246.676 174.732 249.298C174.192 246.02 177.513 242.847 180.938 242.289C184.614 241.69 188.29 243.018 191.956 243.678C195.622 244.339 194.321 228.905 192.599 224.694Z"
                                        fill="#2F2E41"
                                    />
                                    <path
                                        d="M332.304 289.927C334.633 261.79 313.712 237.093 285.575 234.765C257.438 232.436 232.741 253.357 230.413 281.494C228.084 309.631 249.005 334.328 277.142 336.656C305.279 338.985 329.976 318.064 332.304 289.927Z"
                                        fill="#DA1E28"
                                    />
                                    <path
                                        d="M294.787 264.411L281.358 277.839L267.93 264.411C265.756 262.237 262.232 262.237 260.058 264.411C257.885 266.584 257.885 270.109 260.058 272.282L273.487 285.711L260.058 299.139C257.887 301.315 257.89 304.839 260.066 307.011C262.239 309.179 265.757 309.179 267.93 307.011L281.358 293.582L294.787 307.011C296.962 309.182 300.487 309.179 302.658 307.003C304.827 304.83 304.827 301.312 302.658 299.139L289.23 285.711L302.658 272.282C304.832 270.109 304.832 266.584 302.658 264.411C300.485 262.237 296.96 262.237 294.787 264.411Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M261.214 242.744C262.721 247.283 260.262 252.185 255.723 253.692C255.239 253.852 254.742 253.97 254.237 254.043L243.407 307.76L231.959 296.592L244.251 246.11C243.878 241.316 247.461 237.126 252.256 236.753C256.267 236.44 259.971 238.917 261.214 242.744Z"
                                        fill="#A0616A"
                                    />
                                    <path
                                        d="M146.125 312.225L142.076 315.639C138.343 318.801 136.542 323.689 137.33 328.518C137.621 330.357 138.288 332.117 139.288 333.687L139.296 333.7C142.311 338.423 147.863 340.878 153.386 339.931L175.656 336.089C196.941 338.819 221.808 329.429 248 315.559L258.679 265.186L234.446 263.378L225.278 296.16L169.49 304.442L169.457 304.446L149.814 309.124L146.125 312.225Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M272.937 658.99L1.18684 659.298C0.529247 659.296 -0.00212362 658.761 6.38126e-06 658.103C0.00211638 657.449 0.532236 656.919 1.18684 656.916L272.937 656.609C273.594 656.611 274.126 657.146 274.124 657.804C274.122 658.458 273.591 658.988 272.937 658.99Z"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M56.7769 90.7035C61.4473 90.7035 65.2335 86.8329 65.2335 82.0584C65.2335 77.2839 61.4473 73.4133 56.7769 73.4133C52.1064 73.4133 48.3203 77.2839 48.3203 82.0584C48.3203 86.8329 52.1064 90.7035 56.7769 90.7035Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M85.9906 90.7035C90.6611 90.7035 94.4472 86.8329 94.4472 82.0584C94.4472 77.2839 90.6611 73.4133 85.9906 73.4133C81.3202 73.4133 77.534 77.2839 77.534 82.0584C77.534 86.8329 81.3202 90.7035 85.9906 90.7035Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M115.204 90.7035C119.875 90.7035 123.661 86.8329 123.661 82.0584C123.661 77.2839 119.875 73.4133 115.204 73.4133C110.534 73.4133 106.748 77.2839 106.748 82.0584C106.748 86.8329 110.534 90.7035 115.204 90.7035Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M148.516 88.8912C148.256 88.8912 147.997 88.7906 147.801 88.5905L142.095 82.7574C141.715 82.3688 141.715 81.7477 142.095 81.359L147.801 75.5265C148.188 75.132 148.822 75.1256 149.215 75.5109C149.61 75.8971 149.617 76.5304 149.231 76.9249L144.209 82.0582L149.231 87.192C149.617 87.5865 149.61 88.2198 149.215 88.6061C149.021 88.7965 148.768 88.8912 148.516 88.8912Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M158.104 88.8912C157.852 88.8912 157.599 88.7965 157.405 88.6061C157.01 88.2198 157.003 87.587 157.389 87.192L162.411 82.0582L157.389 76.9249C157.003 76.5304 157.01 75.8971 157.405 75.5109C157.799 75.1241 158.433 75.1315 158.819 75.5265L164.525 81.359C164.905 81.7477 164.905 82.3688 164.525 82.7574L158.819 88.5905C158.623 88.7907 158.364 88.8912 158.104 88.8912Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M456.614 74.4142H446.004C444.794 74.4142 443.814 75.3942 443.814 76.6042V87.2242C443.814 88.4342 444.794 89.4142 446.004 89.4142H456.614C457.824 89.4142 458.814 88.4342 458.814 87.2242V76.6042C458.814 75.3942 457.824 74.4142 456.614 74.4142Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M430.614 74.4142H420.004C418.794 74.4142 417.814 75.3942 417.814 76.6042V87.2242C417.814 88.4342 418.794 89.4142 420.004 89.4142H430.614C431.824 89.4142 432.814 88.4342 432.814 87.2242V76.6042C432.814 75.3942 431.824 74.4142 430.614 74.4142Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M481.114 74.9142H470.504C469.294 74.9142 468.314 75.8942 468.314 77.1042V87.7242C468.314 88.9342 469.294 89.9142 470.504 89.9142H481.114C482.324 89.9142 483.314 88.9342 483.314 87.7242V77.1042C483.314 75.8942 482.324 74.9142 481.114 74.9142Z"
                                        fill="#F1C21B"
                                    />
                                    <path
                                        d="M321.192 78.9542H236.382C234.902 78.9542 233.712 80.1542 233.712 81.6243C233.712 83.0943 234.902 84.2942 236.382 84.2942H321.192C322.662 84.2942 323.862 83.0942 323.862 81.6243C323.862 80.1543 322.662 78.9542 321.192 78.9542Z"
                                        fill="#F1C21B"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_289_2368">
                                        <rect width="586.479" height="659.298" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h2>
                            There is <span>no recipe</span> <br />
                            matching your search!
                        </h2>
                    </div>
                )}
            </div>
    )
}
