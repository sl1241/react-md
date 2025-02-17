


import { bem } from "@react-md/utils"

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>

const block = bem("rmd-dialog")

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
export const DialogTitle = ({ children, className, ref, ...props }: DialogTitleProps) => {
  return (
    <h2 {...props} ref={ref} className={[block("title"), className]} >
      {children}
    </h2 >
  )
}
