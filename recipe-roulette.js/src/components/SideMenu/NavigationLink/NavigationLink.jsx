import { Link } from "@tanstack/react-router"
import classes from "../SideMenu.module.scss"

export function NavigationLink({ label, icon, destination, path, setNavSidebar, action }) {
    return (
        <Link
            onClick={() => {
                setNavSidebar()
                action && action()
            }}
            className={`${classes.link} ${path && destination && (path === destination) && classes.activeLink}`}
            to={destination}
        >
            {icon}
            {label && <p>{label}</p>}
        </Link>
    )
}
