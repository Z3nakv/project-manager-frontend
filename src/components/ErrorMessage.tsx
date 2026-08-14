import type { PropsWithChildren } from "react"


const ErrorMessage = ({ children } : PropsWithChildren) => {
  return (
    <div className="text-center my-4 bg-error-subtle text-error font-bold p-3 uppercase text-sm">
        { children }
    </div>
  )
}

export default ErrorMessage