
import { useIcon } from "@react-md/icon"
import type { BaseMenuItemInputToggleProps } from "./MenuItemInputToggle"
import { MenuItemInputToggle } from "./MenuItemInputToggle"

/** @remarks \@since 2.8.0 */
export type MenuItemRadioProps = BaseMenuItemInputToggleProps

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a radio and pulling the radio icon from the
 * {@link IconProvider}.
 *
 * @remarks
 * If a menu or menubar contains more than one group of menuitemradio elements,
 * or if the menu contains one group and other, unrelated menu items, authors
 * SHOULD nest each set of related menuitemradio elements in an element using
 * the group role, and authors SHOULD delimit the group from other menu items
 * with an element using the separator role.
 * @see {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio}
 *
 * @example
 * Only Radio Items
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu } from "@react-md/menu";
 * import { MenuItemRadio } from "@react-md/form";
 *
 * function Example(): Child {
 *   const [value, setValue] = useState("value1");
 *
 *   return (
 *     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
 *       <MenuItemRadio
 *         id="radio-1"
 *         checked={value === "value1"}
 *         onCheckedChange={() => setValue("value1")}
 *       >
 *          Radio 1
 *       </MenuItemRadio>
 *       <MenuItemRadio
 *         id="radio-2"
 *         checked={value === "value2"}
 *         onCheckedChange={() => setValue("value2")}
 *       >
 *         Radio 2
 *       </MenuItemRadio>
 *       <MenuItemRadio
 *         id="radio-3"
 *         checked={value === "value3"}
 *         onCheckedChange={() => setValue("value3")}
 *       >
 *         Radio 3
 *       </MenuItemRadio>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @example
 * With Other Items
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu, MenuItemGroup, MenuItemSeparator } from "@react-md/menu";
 * import { MenuItemRadio, MenuItemSwitch } from "@react-md/form";
 *
 * function Example(): Child {
 *   const [value, setValue] = useState("value1");
 *
 *   return (
 *     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
 *       <MenuItemSwitch
 *         id="switch-id"
 *         checked={checked}
 *         onCheckedChange={nextChecked => setChecked(nextChecked)}
 *       >
 *         Light mode
 *       </MenuItemSwitch>
 *       <MenuItemSeparator />
 *       <MenuItemGroup aria-label="My Group Label">
 *         <MenuItemRadio
 *           id="radio-1"
 *           checked={value === "value1"}
 *           onCheckedChange={() => setValue("value1")}
 *         >
 *           Radio 1
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           id="radio-2"
 *           checked={value === "value2"}
 *           onCheckedChange={() => setValue("value2")}
 *         >
 *           Radio 2
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           id="radio-3"
 *           checked={value === "value3"}
 *           onCheckedChange={() => setValue("value3")}
 *         >
 *           Radio 3
 *         </MenuItemRadio>
 *       </MenuItemGroup>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.8.0
 */
export const MenuItemRadio = ({ icon: propIcon, ref, ...props }) => {
  const icon = useIcon("radio", propIcon)
  //@ts-ignore
  return <MenuItemInputToggle {...props} ref={ref} icon={icon} type="radio" />

}

