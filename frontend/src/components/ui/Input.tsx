import { ChevronDown, Search } from "lucide-react";
import { InputHTMLAttributes, ReactNode } from "react";
import { ColorDot } from "@/components/ui/ColorDot";

export type InputVariant = "basic" | "icon" | "prefix" | "color-tag";

interface BaseInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
}

interface BasicInputProps
  extends BaseInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  variant?: "basic";
  maxLength?: number;
  value?: string;
}

interface IconInputProps
  extends BaseInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  variant: "icon";
  icon?: ReactNode;
}

interface PrefixInputProps
  extends BaseInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  variant: "prefix";
  prefix?: string;
}

interface ColorTagInputProps extends BaseInputProps {
  variant: "color-tag";
  tagColor?: string;
  tagLabel?: string;
  onClick?: () => void;
}

export type InputProps =
  | BasicInputProps
  | IconInputProps
  | PrefixInputProps
  | ColorTagInputProps;

const inputBase =
  "w-full bg-white border border-grey-300 rounded-lg px-200 py-150 text-preset-4 text-grey-900 placeholder:text-grey-500 focus:outline-none focus:border-grey-900 transition-colors";

function InputWrapper({
  label,
  helperText,
  error,
  children,
  charCounter,
}: {
  label?: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
  charCounter?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-100">
      {(label || charCounter) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-preset-5-bold text-grey-500">{label}</label>
          )}
          {charCounter}
        </div>
      )}
      {children}
      {(error || helperText) && (
        <p
          className={`text-preset-5 ${error ? "text-red" : "text-grey-500"}`}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}

export function Input(props: InputProps) {
  const { variant = "basic", label, helperText, error } = props;

  if (variant === "color-tag") {
    const { tagColor, tagLabel, onClick } = props as ColorTagInputProps;
    return (
      <InputWrapper label={label} helperText={helperText} error={error}>
        <button
          type="button"
          onClick={onClick}
          className="flex items-center justify-between gap-200 bg-white border border-grey-300 rounded-lg px-200 py-150 w-full text-preset-4 text-grey-900 focus:outline-none focus:border-grey-900 transition-colors"
        >
          <span className="flex items-center gap-200">
            {tagColor && <ColorDot color={tagColor} size="md" />}
            <span className={tagLabel ? "text-grey-900" : "text-grey-500"}>
              {tagLabel ?? "Select category"}
            </span>
          </span>
          <ChevronDown size={16} className="text-grey-500 shrink-0" />
        </button>
      </InputWrapper>
    );
  }

  if (variant === "prefix") {
    const { prefix = "$", ...rest } = props as PrefixInputProps;
    const { label: _l, helperText: _h, error: _e, variant: _v, ...inputRest } = rest;
    return (
      <InputWrapper label={label} helperText={helperText} error={error}>
        <div className="relative flex items-center">
          <span className="absolute left-200 text-preset-4 text-grey-500 select-none pointer-events-none">
            {prefix}
          </span>
          <input
            className={`${inputBase} pl-[36px]`}
            {...inputRest}
          />
        </div>
      </InputWrapper>
    );
  }

  if (variant === "icon") {
    const { icon, ...rest } = props as IconInputProps;
    const { label: _l, helperText: _h, error: _e, variant: _v, ...inputRest } = rest;
    return (
      <InputWrapper label={label} helperText={helperText} error={error}>
        <div className="relative flex items-center">
          <input
            className={`${inputBase} pr-[40px]`}
            {...inputRest}
          />
          <span className="absolute right-200 text-grey-500 pointer-events-none">
            {icon ?? <Search size={16} />}
          </span>
        </div>
      </InputWrapper>
    );
  }

  // basic
  const { maxLength, value, label: _l, helperText: _h, error: _e, variant: _v, ...inputRest } =
    props as BasicInputProps;

  const charCounter =
    maxLength !== undefined ? (
      <span className="text-preset-5 text-grey-500">
        {maxLength - (typeof value === "string" ? value.length : 0)} characters
        left
      </span>
    ) : undefined;

  return (
    <InputWrapper
      label={label}
      helperText={helperText}
      error={error}
      charCounter={charCounter}
    >
      <input
        className={inputBase}
        maxLength={maxLength}
        value={value}
        {...inputRest}
      />
    </InputWrapper>
  );
}
