// import type { Reducer } from 'voby';
import { $, store } from 'voby'
// import { $ } from "@react-md/utils"

import type { RippleEvent, RipplesState, RippleState } from "./types"
import { createRippleState, getType, isBubbled, isRippleable } from "./utils"

export const CREATE = "CREATE"
export const CANCEL = "CANCEL"
export const RELEASE = "RELEASE"
export const ENTERED = "ENTERED"
export const REMOVE = "REMOVE"

export interface CreateAction<E extends HTMLElement> {
    type: typeof CREATE
    event: RippleEvent<E>
    disableSpacebarClick: boolean
}
export interface ReleaseAction<E extends HTMLElement> {
    type: typeof RELEASE
    event: RippleEvent<E>
}
export interface EnteredAction {
    type: typeof ENTERED
    ripple: RippleState
}
export interface RemoveAction {
    type: typeof REMOVE
    ripple: RippleState
}

export interface CancelAction {
    type: typeof CANCEL
    ease: boolean
}
type RippleStateAction<E extends HTMLElement> =
    | CreateAction<E>
    | ReleaseAction<E>
    | CancelAction
    | EnteredAction
    | RemoveAction
type RippleStateReducer<E extends HTMLElement> = //Reducer<
    RipplesState//,
//   RippleStateAction<E>
// >

/**
 * This function will create a simplified version of the create event
 * that only includes the parts that are needed to trigger a ripple.
 * This is really only required since `event.persist()` crashed a lot
 * when spamming the trigger events and it threw warnings when not
 * persisting the event.
 */
export function createRippleAction<E extends HTMLElement>(
    event: RippleEvent<E>,
    disableSpacebarClick: boolean
): CreateAction<E> {
    const { type, target, currentTarget, touches, pageX, pageY, button, key } =
        event as JSX.TargetedMouseEvent<E> & JSX.TargetedTouchEvent<E> & JSX.TargetedKeyboardEvent<E>

    return {
        type: CREATE,
        disableSpacebarClick,
        event: {
            type,
            key,
            target,
            button,
            currentTarget,
            touches,
            pageX,
            pageY,
        },
    }
}

function createRipple(state: RipplesState, event: RippleEvent<HTMLElement>, disableSpacebarClick: boolean): RipplesState {
    if (!isRippleable(event, disableSpacebarClick) || isBubbled(event)) {
        return state
    }

    if (state.find((r) => r.holding) || (getType(event) !== "touch" && state.find((r) => r.type === "touch"))) {
        // keyboard events are a bit different than the others since it is actually
        // spammable since the space or enter key can be held down which triggers click
        // events infinitely until they release. There's also the fun fact that mouse
        // events are triggered after touch events, so we need to make sure duplicate
        // ripples aren't created for these
        return state
    }

    state.push(createRippleState(event))
    return state
}

function enteredRipple(state: RipplesState, ripple: RippleState): RipplesState {
    const i = state.findIndex((r) => r === ripple)
    if (i === -1 || ripple.exiting)
        return state


    const nextState = state //.slice()
    const exiting = !ripple.holding || Date.now() - ripple.startTime > 300
    nextState[i] = {
        ...ripple,
        exiting,
        entered: true,
    }
    return nextState
}

function releaseRipple(state: RipplesState): RipplesState {
    const i = state.findIndex((r) => r.holding && !r.exiting)
    if (i === -1)
        return state

    const ripple = state[i]
    const exiting = ripple.entered || Date.now() - ripple.startTime > 300
    const nextState = state //.slice()
    nextState[i] = {
        ...ripple,
        exiting,
        holding: false,
    }
    return nextState
}

function removeRipple(state: RipplesState, ripple: RippleState): RipplesState {
    const i = state.findIndex((r) => r.startTime === ripple.startTime)
    if (i === -1)
        return state

    const nextState = state //.slice()
    nextState.splice(i, 1)
    return nextState
}

function cancelRipples(state: RipplesState, ease: boolean): RipplesState {
    if (ease) {
        state.map((r, i, a) => state[i] = {
            ...r,
            exiting: true,
            mounted: true,
            holding: false,
        })
        return state
    }

    state.length = 0
    return state //[]
}

export function reducer<E extends HTMLElement>(state = store([] as RipplesState)) {
    const create = (event: RippleEvent<E>, disableSpacebarClick: boolean) => createRipple(state, event, disableSpacebarClick)
    const release = () => releaseRipple(state)
    const cancel = (ease: boolean) => cancelRipples(state, ease)
    const entered = (ripple: RippleState) => enteredRipple(state, ripple)
    const remove = (ripple: RippleState) => removeRipple(state, ripple)

    return { state, create, release, cancel, entered, remove, }
}

interface ReturnValue<E extends HTMLElement> {
    state: RipplesState
    create: (event: RippleEvent<E>) => void
    release: (event: RippleEvent<E>) => void
    entered: (ripple: RippleState) => void
    cancel: (ease?: FunctionMaybe<Nullable<boolean>>) => void
    remove: (ripple: RippleState) => void
}

/**
 * This hook creates memoized callbacks for each part of the ripple transition
 * as well as returning the current list of ripples.
 */
export function useRippleTransition<E extends HTMLElement = HTMLElement>(disableSpacebarClick = false)/* : ReturnValue<E> */ {
    const state = /* RippleStateReducer<E> */reducer(store([]))
    // const spacebarRef = $(disableSpacebarClick)
    // const create = $((event: RippleEvent<E>) => {
    //   const disableSpacebarClick = spacebarRef()
    //   state.create(event, disableSpacebarClick)
    //   // dispatch(createRippleAction(event, disableSpacebarClick))
    //   // disabled since useRefCache
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // })
    // const release = $((event: RippleEvent<E>) => {
    //   state.release()
    //   // dispatch({ type: RELEASE, event })
    // })
    // const entered = $((ripple: RippleState) => {
    //   state.entered(ripple)
    //   // dispatch({ type: ENTERED, ripple })
    // })
    // const cancel = $((ease = false) => {
    //   state.cancel(ease)
    //   // dispatch({ type: CANCEL, ease })
    // })
    // const remove = $((ripple: RippleState) => {
    //   state.remove(ripple)
    //   // dispatch({ type: REMOVE, ripple })
    // })

    return state  //{ state, create, release, entered, remove, cancel }
}
