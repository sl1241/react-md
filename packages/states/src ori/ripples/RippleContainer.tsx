import type { ReactElement } from "react"

import type {
    CSSTransitionClassNames,
    TransitionTimeout,
} from "@react-md/transition"

import { Ripple } from "./Ripple"
import type { RipplesState, RippleState } from "./types"

export interface RippleContainerProps {
    ripples: RipplesState
    entered: (ripple: RippleState) => void
    exited: (ripple: RippleState) => void
    className?: string
    rippleClassName?: string
    timeout?: TransitionTimeout
    classNames?: CSSTransitionClassNames
}

export function RippleContainer({
    ripples,
    className,
    rippleClassName,
    timeout,
    classNames,
    entered,
    exited,
}: RippleContainerProps): ReactElement {
    return (
        <span className={cn("rmd-ripple-container", className)}>
            {ripples.map((ripple) => (
                <Ripple
                    key={ripple.startTime}
                    ripple={ripple}
                    className={rippleClassName}
                    entered={entered}
                    exited={exited}
                    timeout={timeout}
                    classNames={classNames}
                />
            ))}
        </span>
    )
}
