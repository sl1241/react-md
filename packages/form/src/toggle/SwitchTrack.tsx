import type { CSSProperties, } from 'voby'


import type { PropsWithRef } from "@react-md/utils"
import { bem } from "@react-md/utils"

const styles = bem("rmd-switch")

/** @remarks \@since 2.8.0 */
export interface SwitchTrackProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * If an `id` is provided, the track will contain a checkbox input element and
   * render the "ball" as a `<label>`. If the `id` is omitted, no input element
   * will be rendered and the "ball" will be rendered as a `<span>`.
   *
   * Basically only omit the `id` if this is used in another accessible widget
   * like `menuitemcheckbox`.
   */
  id?: FunctionMaybe<Nullable<string>>

  /**
   * An optional style object to provide to the ball.
   */
  ballStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional class name to provide to the ball.
   */
  ballClassName?: Class

  /**
   * Any additional props and optional ref to provide to the track itself since
   * all the props are normally provided to the `<input>` element instead.
   */
  containerProps?: PropsWithRef<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
}

/**
 * This is most likely an internal only component that is used to render the
 * switch element either as a checkbox or in the `MenuItemSwitch` component.
 *
 * @remarks \@since 2.8.0
 */
export const SwitchTrack = (
  {
    id,
    disabled = false,
    className,
    ballStyle,
    ballClassName,
    containerProps,
    //@ts-ignore
    children,
    ref,
    ...props
  }: SwitchTrackProps
) => {
  const { checked = false } = props
  return (
    <span
      {...containerProps}
      className={[styles(), className, containerProps?.className]}
    >
      {id && (
        <>
          <input
            {...props}
            id={id}
            ref={ref}
            type="checkbox"
            className={[styles("input")]}
            disabled={disabled}
          />
          {/** @ts-ignore */}
          <label
            htmlFor={id}
            aria-hidden
            //@ts-ignore
            style={ballStyle}
            className={[styles("ball"), ballClassName]}
          >
            {children}
          </label>
        </>
      )}
      {!id && (
        <span
          //@ts-ignore
          style={ballStyle}
          className={[styles("ball", { checked }), ballClassName]}
        />
      )}
    </span>
  )
}

