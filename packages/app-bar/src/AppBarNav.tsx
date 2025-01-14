import type { ButtonProps } from "@react-md/button"
import { Button } from "@react-md/button"
import { bem } from "@react-md/utils"

import type { AppBarColorInherit } from "./useInheritContext"
import { useInheritContext } from "./useInheritContext"
import { $$ } from "voby"

export interface AppBarNavProps extends ButtonProps, AppBarColorInherit { }

const block = bem("rmd-app-bar")

/**
 * This component is really just a simple wrapper for the `Button` component
 * that adds some additional styles for adding spacing before and after this
 * button so that it aligns to the main "keyline" of your application's
 * navigation. In simpler terms, it will make the left side of the icon in this
 * button aligns with all the other icons that appear in `ListItem`s in your
 * main navigation.
 *
 * This component is generally really only used when you want to have a
 * temporary navigation element like a hamburger menu.
 */
export const AppBarNav = ({ className, children, inheritColor, floating, theme = floating ? "secondary" : "clear", buttonType = "icon", ref, ...props }: AppBarNavProps) => {
    return (
        <Button
            {...props}
            theme={theme}
            floating={floating}
            buttonType={buttonType}
            ref={ref}
            className={[
                block("nav", {
                    inherit: useInheritContext($$(inheritColor)),
                }),
                className
            ]}
        >
            {children}
        </Button>
    )
}
