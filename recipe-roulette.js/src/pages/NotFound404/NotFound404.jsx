import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

import notFountImage from "../../assets/images/404 Error with a cute animal-bro.svg"

import layouts from "../../assets/scss/pageLayout/pageFH.module.scss"
import { Header } from "../../components/Header/Header"

export function NotFound404() {
    return (
        <div className={layouts.pageFH}>
            <Header pageTitle="Page not found" />
            <Placeholder
                topImage={notFountImage}
                buttons={[<Button key={"Return to home"} label="Return to home" iconLeft={<HomeOutlinedIcon />} link={"/"} cta={true} />]}
            />
        </div>
    )
}
