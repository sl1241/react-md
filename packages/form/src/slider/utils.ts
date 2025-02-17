import { getPercentage, nearest } from "@react-md/utils"

import type {
    DefinedSliderValueOptions,
    RangeSliderControls,
    RangeSliderValue,
    SliderControls,
    SliderValue,
    ThumbIndex,
} from "./types"
import { Observable, $, $$ } from "voby"

/**
 * Gets the number of steps in the allowed range of values.
 *
 * @internal
 * @remarks \@since 2.5.0
 */
export const getSteps = (min: number, max: number, step: number): number =>
    Math.abs(max - min) / step

/**
 *
 * @internal
 * @remarks \@since 2.5.0
 */
export const getJumpValue = (
    min: number,
    max: number,
    step: number,
    jump: number | undefined
): number => {
    const steps = getSteps(min, max, step)
    const value = jump ?? (steps / 10) * step
    if (Number.isInteger(step)) {
        return Math.ceil(value)
    }

    return value
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export type SliderDragEvent =
    MouseEvent
    | TouchEvent
// | React.JSX.TargetedMouseEvent
// | React.TouchEvent

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export const isMouseEvent = (
    event: SliderDragEvent
): event is MouseEvent & { type: "mousedown" | "mousemove" | "mouseup" } =>
    event.type === "mousedown" ||
    event.type === "mousemove" ||
    event.type === "mouseup"

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export const isTouchEvent = (
    event: SliderDragEvent
): event is TouchEvent & { type: "touchstart" | "touchmove" | "touchend" } =>
    event.type === "touchstart" ||
    event.type === "touchmove" ||
    event.type === "touchend"

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export interface SimpleSliderControls extends Omit<SliderControls, 'value'> {
    value: Observable<SliderValue>
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export interface ComplexSliderControls extends Omit<RangeSliderControls, 'value'> {
    value: Observable<RangeSliderValue>
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export type CombinedSliderControls =
    | SimpleSliderControls
    | ComplexSliderControls

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export const isRangeSlider = (controls: CombinedSliderControls): controls is ComplexSliderControls => Array.isArray(controls.value)

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export interface SliderDragValues extends DefinedSliderValueOptions {
    clientX: FunctionMaybe<number>
    clientY: FunctionMaybe<number>
    top: FunctionMaybe<number>
    height: FunctionMaybe<number>
    left: FunctionMaybe<number>
    width: FunctionMaybe<number>
    isRtl: FunctionMaybe<boolean>
    vertical: FunctionMaybe<boolean>
    minValue: FunctionMaybe<number>
    maxValue: FunctionMaybe<number>
}

/**
 * @remarks \@since 2.5.0
 * @internal
 */
export interface SliderDragValue {
    /**
     * This is the current value for the slider that is completely "valid" and
     * within the provided range.
     */
    value: number

    /**
     * The current percentage dragged number (`> 0` and `< 1`). This is used only
     * while dragging with the mouse or touch since it makes the drag experience
     * smoother. If this is omitted and there is a small number of "steps" in the
     * range, the mouse/touch won't align with the thumb since it will only move
     * when the value is updated as well.
     *
     * Example:
     * - slider has width of 1000px, min value is 0, max value is 100, step is 20
     * - formula:
     *   - range = max - min
     *   - steps = range / step
     *   - new-value-at = slider-width / steps
     *   - new-value-at = slider-width / ((max - min) / step)
     * - so:
     *   - new-value-at = 1000px / ((100 - 0) / 20)
     *   - new-value-at = 1000px / (100 / 20)
     *   - new-value-at = 1000px / 5
     *   - new-value-at = 200px
     * - user drags from `0px -> 10px`
     *   - no visual change
     * - user drags from `10px -> 190px`
     *   - no visual change
     * - user drags from `190px -> 200px`
     *   - visual change to first step
     *
     * The current value allows for a visual change while the user drags, but the
     * thumb will move to the correct value once the user stops dragging.
     */
    current: number
}

/**
 * This is used to get the next value for the slider while being dragged via
 * mouse or touch.
 *
 * @internal
 * @remarks \@since 2.5.0
 */
export const getDragValue = ({
    min: mn,
    max: mx,
    step: sp,
    vertical: vl,
    clientX: cx,
    clientY: cy,
    left: lf,
    top: tp,
    height: ht,
    width: wd,
    isRtl: ir,
    minValue: mnv,
    maxValue: mxv,
}: SliderDragValues): SliderDragValue => {
    const min = $$(mn), max = $$(mx), step = $$(sp), vertical = $$(vl), clientX = $$(cx), clientY = $$(cy), left = $$(lf), top = $$(tp),
        height = $$(ht), width = $$(wd), isRtl = $$(ir), minValue = $$(mnv), maxValue = $$(mxv)

    const sliderSize = vertical ? height : width
    const sliderPosition = vertical ? top + height : left
    const cursorPosition = vertical ? clientY : clientX
    const difference = vertical
        ? sliderPosition - cursorPosition
        : cursorPosition - sliderPosition

    const distanceDragged = Math.min(Math.max(0, difference), sliderSize)
    let percentageDragged = distanceDragged / sliderSize
    if (isRtl && !vertical) {
        percentageDragged = 1 - percentageDragged
    }

    const range = max - min
    const steps = getSteps(min, max, step)
    const value = percentageDragged * range + min
    const rounded = nearest(value, minValue, maxValue, steps, range)

    return {
        value: rounded,
        current: percentageDragged,
    }
}

/**
 * @remarks \@since 2.5.0
 * @internal
 */
interface DragPercentageOptions {
    min: FunctionMaybe<number>
    max: FunctionMaybe<number>
    thumb1Value?: FunctionMaybe<Nullable<number>>
    thumb2Value?: FunctionMaybe<Nullable<number>>
    dragging: FunctionMaybe<boolean>
    dragValue: FunctionMaybe<number>
    draggingIndex: FunctionMaybe<ThumbIndex | null>
}

interface DragPercentage {
    thumb1Percentage: string
    thumb2Percentage: string | undefined
}

/**
 * Small util to get the drag percentage for the thumbs within a slider. This
 * makes sure to use the current `dragValue` when possible so that the thumb
 * moves with the mouse/touch instead of only for the current values. See
 * {@link getDragValue} for more examples.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export const getDragPercentage = ({
    min: mn,
    max: mx,
    dragging: dg,
    dragValue: dv,
    draggingIndex: di,
    thumb1Value: t1,
    thumb2Value: t2,
}: DragPercentageOptions): DragPercentage => {
    const min = $$(mn), max = $$(mx), dragging = $$(dg), dragValue = $$(dv), draggingIndex = $$(di), thumb1Value = $$(t1), thumb2Value = $$(t2)

    let thumb1Percentage =
        dragging && draggingIndex === 0
            ? dragValue
            : getPercentage({
                min,
                max,
                value: $$(thumb1Value),
                validate: false,
            })

    let thumb2Percentage: number | undefined
    if (typeof thumb2Value === "number") {
        const percentage = getPercentage({
            min,
            max,
            value: thumb2Value,
            validate: false,
        })
        thumb1Percentage = Math.min(thumb1Percentage, percentage)
        thumb2Percentage =
            dragging && draggingIndex === 1
                ? Math.max(thumb1Percentage, dragValue)
                : percentage
    }

    return {
        thumb1Percentage: `${thumb1Percentage * 100}%`,
        thumb2Percentage:
            typeof thumb2Percentage === "number"
                ? `${thumb2Percentage * 100}%`
                : undefined,
    }
}
