"use client";

import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
}

const inputBase =
  "w-full bg-white border border-grey-300 rounded-lg px-200 py-150 pr-[44px] text-preset-4 text-grey-900 placeholder:text-grey-500 focus:outline-none focus:border-grey-900 transition-colors";

export function PasswordInput({
  label,
  helperText,
  error,
  className = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-100">
      {label && (
        <label className="text-preset-5-bold text-grey-500">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          type={visible ? "text" : "password"}
          className={`${inputBase} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-200 text-grey-500 hover:text-grey-900 transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {(error || helperText) && (
        <p className={`text-preset-5 ${error ? "text-red" : "text-grey-500"}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
