import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className = "", type = "text", ...props }, ref) {
  return <input ref={ref} type={type} className={className} {...props} />;
});
