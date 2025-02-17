


import { bem } from "@react-md/utils"

import { THUMB_1_VAR, THUMB_2_VAR } from "./constants"
import type { SliderPresentation } from "./types"
import voby, { $$, mergeStyles } from 'voby'

const styles = bem("rmd-slider-track")

type CSSProperties = voby.CSSProperties & {
  [THUMB_1_VAR]?: FunctionMaybe<Nullable<string>>;
  [THUMB_2_VAR]?: FunctionMaybe<Nullable<string>>
}

/**
 * @remarks \@since 2.5.0
 */
export interface SliderTrackProps<T extends EventTarget = HTMLSpanElement>
  extends HTMLAttributes<T>,
  SliderPresentation {
  /**
   * Boolean if the track should animate the value position whenever the
   * value changes. This should normally be set to `true` only when the track
   * is "idle" and not being dragged.
   */
  animate?: FunctionMaybe<Nullable<boolean>>

  /**
   * This should be the current value as a percentage for the first thumb that
   * appears within the slider.
   */
  thumb1Percentage: FunctionMaybe<string>

  /**
   * This should be the current value as a percentage for the second thumb that
   * appears within the slider, but only when behaving as a range slider.
   */
  thumb2Percentage?: FunctionMaybe<Nullable<string>>
}

/**
 * The `SliderTrack` component is used to show the distance that the slider can
 * be dragged as well as a visual indication of the value. The main usage is to
 * update the custom css properties for the thumb's values.
 *
 * @remarks \@since 2.5.0
 */
export const SliderTrack = (
  {
    style: propStyle,
    className,
    children,
    animate = false,
    vertical = false,
    disabled = false,
    thumb1Percentage,
    thumb2Percentage,
    ref,
    ...props
  }: SliderTrackProps<HTMLSpanElement>
) => {
  const style: CSSProperties = mergeStyles($$(propStyle),
    {
      [THUMB_1_VAR]: thumb1Percentage,
      [THUMB_2_VAR]: thumb2Percentage,
    }
  )

  return (
    <span
      {...props}
      ref={ref}
      style={style}
      className={[
        styles({
          animate,
          hoverable: !disabled,
          disabled,
          h: !vertical,
          h1: !vertical && !thumb2Percentage,
          h2: !vertical && thumb2Percentage,
          v: vertical,
          v1: vertical && !thumb2Percentage,
          v2: vertical && thumb2Percentage,
        }),
        className
      ]}
    >
      {children}
    </span>
  )
}
