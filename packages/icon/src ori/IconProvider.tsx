import { createContext, useContext, useMemo } from 'voby'

import { FontIcon } from "./FontIcon"

/**
 * @remarks \@since 5.0.0 The `download` icon has been renamed to `upload`.
 */
export interface ConfigurableIcons {
  /**
   * The general icon for navigating backwards or closing an item to the left.
   */
  back?: JSX.Child

  /**
   * The general icon to use for checkboxes.
   */
  checkbox?: JSX.Child

  /**
   * The general icon to use for dropdown menus or content that expands
   * vertically in a new material instead of inline like the `expander` icon.
   */
  dropdown?: JSX.Child

  /**
   * The general icon to use when there are form errors.
   *
   * @remarks \@since 2.5.0
   */
  error?: JSX.Child

  /**
   * The general icon to use for expanding content vertically.
   */
  expander?: JSX.Child

  /**
   * The general icon for navigating forwards or closing an item to the right.
   * This is also used internally for nested dropdown menus.
   */
  forward?: JSX.Child

  /**
   * The general icon to use for displaying a main navigation menu.
   */
  menu?: JSX.Child

  /**
   * The general icon for displaying notifications. This is used internally in
   * the `BadgedButton` in the `@react-md/badge` package.
   */
  notification?: JSX.Child

  /**
   * The general icon for temporarily displaying a password's field value as
   * plain text.
   */
  password?: JSX.Child

  /**
   * The general icon to use for radio buttons.
   */
  radio?: JSX.Child

  /**
   * The general icon to use for showing that something has been selected that
   * is not a radio or checkbox. This is used internally for the `Chip` in the
   * `@react-md/chip` package.
   */
  selected?: JSX.Child

  /**
   * The general icon for sorting content. This defaults to the sort ascending
   * behavior.
   */
  sort?: JSX.Child

  /**
   * The general icon to use for the `FileInput` component (normally file
   * uploads).
   *
   * @remarks \@since 5.0.0
   */
  upload?: JSX.Child
}

export type ConfiguredIcons = Required<ConfigurableIcons>

const DEFAULT_ICONS: ConfiguredIcons = {
  back: <FontIcon>keyboard_arrow_left</FontIcon>,
  checkbox: <FontIcon>check_box</FontIcon>,
  upload: <FontIcon>file_upload</FontIcon>,
  dropdown: <FontIcon>arrow_drop_down</FontIcon>,
  error: <FontIcon>error_outline</FontIcon>,
  expander: <FontIcon>keyboard_arrow_down</FontIcon>,
  forward: <FontIcon>keyboard_arrow_right</FontIcon>,
  menu: <FontIcon>menu</FontIcon>,
  notification: <FontIcon>notifications</FontIcon>,
  password: <FontIcon>remove_red_eye</FontIcon>,
  radio: <FontIcon>radio_button_checked</FontIcon>,
  selected: <FontIcon>check</FontIcon>,
  sort: <FontIcon>arrow_upward</FontIcon>,
}

const context = createContext<ConfiguredIcons>(DEFAULT_ICONS)
const { Provider } = context

/**
 * Gets one of the configured icons from the `IconProvider`. This is probably
 * just for use within `react-md`, but might be helpful outside if you want to
 * reuse the existing icon configuration for other custom components.
 *
 * If te second argument is provided and it is not `undefined`, that value will
 * be used instead of the inherited icon type.
 *
 * @param name - The name of the icon you want to use.
 * @param override - An optional override to use instead of the inherited icon.
 * @returns The overridden icon value or the inherited icon.
 */
export function useIcon(name: keyof ConfigurableIcons, override?: JSX.Child | undefined): JSX.Child {
  const icons = useContext(context)

  if (typeof override !== "undefined") {
    return override
  }

  return icons[name]
}

export interface IconProviderProps extends ConfigurableIcons {
  /**
   * The children that should inherit the icon provider context. This is
   * required since this component is pretty much worthless to use if you don't
   * inherit the overridden icons.
   */
  children: JSX.Child
}

/**
 * The `IconProvider` component is used to override all the default icons within
 * `react-md` with a newly defined set of icons. This is super nice since you
 * won't need to create new component wrappers for all the components within
 * `react-md` if you want to switch to SVG icons instead of the default font
 * icons.
 */
export function IconProvider({
  children,
  back = DEFAULT_ICONS.back,
  checkbox = DEFAULT_ICONS.checkbox,
  dropdown = DEFAULT_ICONS.dropdown,
  expander = DEFAULT_ICONS.expander,
  error = DEFAULT_ICONS.error,
  forward = DEFAULT_ICONS.forward,
  menu = DEFAULT_ICONS.menu,
  notification = DEFAULT_ICONS.notification,
  password = DEFAULT_ICONS.password,
  radio = DEFAULT_ICONS.radio,
  selected = DEFAULT_ICONS.selected,
  sort = DEFAULT_ICONS.sort,
  upload = DEFAULT_ICONS.upload,
}: IconProviderProps): Element {
  const value = useMemo<ConfiguredIcons>(
    () => ({
      back,
      checkbox,
      dropdown,
      error,
      expander,
      forward,
      menu,
      notification,
      password,
      radio,
      selected,
      sort,
      upload,
    })
  )

  return <Provider value={value}>{children}</Provider>
}
