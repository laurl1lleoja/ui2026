import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({
  className = "",
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition focus:outline-none";
  const variantClasses =
    variant === "outline"
      ? "border border-white/20 bg-transparent"
      : "bg-white text-slate-900";
  return <button type={type} className={`${base} ${variantClasses} ${className}`} {...props} />;
}
