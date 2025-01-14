import type { 
CSSTransitionClassNames, 
TransitionTimeout,  } from "@react-md/transition";

export const DEFAULT_SHEET_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_SHEET_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
  exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
};
