


import type {
  ListItemLinkProps,
  ListItemLinkWithComponentProps,
} from "@react-md/list"
import { ListItemLink } from "@react-md/list"
import { useKeyboardFocusableElement } from "@react-md/utils"

/** @remarks \@since 2.0.0 */
export interface MenuItemLinkProps extends ListItemLinkProps {
  /**
   * The current role for the menu item. This will eventually be updated for
   * some of the other `menuitem*` widgets.
   */
  role?: FunctionMaybe<Nullable<"menuitem">>

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: FunctionMaybe<Nullable<number>>

  /**
   * Any additional props that should be provided to the `<li>` that wraps the
   * link component. You probably won't ever need to use this.
   *
   * @remarks \@since 5.0.0
   */
  liProps?: Readonly<HTMLAttributes<HTMLLIElement>>
}

/** @remarks \@since 2.0.0 */
export type MenuItemLinkWithComponentProps = MenuItemLinkProps &
  ListItemLinkWithComponentProps

/**
 * This is a wrapper for the {@link ListItemLink} component that allows for the
 * correct keyboard focus behavior within {@link Menu}s. Just like the
 * {@link ListItemLink}, set a {@link ListItemLinkProps.component} prop to your
 * custom `Link` if needed.
 *
 * @remarks \@since 2.0.0
 */
export const MenuItemLink = ({ className, children, role = "menuitem", tabIndex = -1, liProps, ref: nodeRef, ...props }: MenuItemLinkProps | MenuItemLinkWithComponentProps) => {
  const ref = useKeyboardFocusableElement(nodeRef as any)
  return (
    <li {...liProps} role="none">
      <ListItemLink
        {...props}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={["rmd-menu-item", className]}
      >
        {children}
      </ListItemLink>
    </li>
  )
}
