import { ChevronRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseStyles =
  "inline-flex items-center justify-center gap-100 rounded-lg py-150 px-300 text-preset-4-bold transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-grey-900 text-white hover:bg-grey-500",
  secondary:
    "bg-beige-100 text-grey-900 border border-transparent hover:bg-white hover:border-grey-300",
  tertiary:
    "bg-transparent text-grey-500 hover:text-grey-900 py-0 px-0 rounded-none",
  destructive:
    "bg-red text-white hover:bg-red/90",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {variant === "tertiary" && <ChevronRight size={16} />}
    </button>
  );
}
