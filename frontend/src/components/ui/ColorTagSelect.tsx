"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ColorDot } from "@/components/ui/ColorDot";
import { CATEGORY_COLORS } from "@/lib/constants";

interface ColorTagSelectProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  usedColors?: string[];
}

export function ColorTagSelect({
  label = "Theme",
  value,
  onChange,
  usedColors = [],
}: ColorTagSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="flex flex-col gap-100" ref={ref}>
      <label className="text-preset-5-bold text-grey-500">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-between gap-200 bg-white border border-grey-300 rounded-lg px-200 py-150 w-full text-preset-4 focus:outline-none focus:border-grey-900 transition-colors"
        >
          <span className="flex items-center gap-200">
            {value && <ColorDot color={value} size="md" />}
            <span className={value ? "text-grey-900" : "text-grey-500"}>
              {value || "Select Theme"}
            </span>
          </span>
          <ChevronDown size={16} className="text-grey-500 shrink-0" />
        </button>

        {open && (
          <ul className="absolute z-10 mt-50 w-full bg-white border border-grey-300 rounded-lg py-50 shadow-sm max-h-[220px] overflow-y-auto">
            {CATEGORY_COLORS.map((color) => {
              const disabled = usedColors.includes(color) && color !== value;
              return (
                <li key={color}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) { onChange(color); setOpen(false); }
                    }}
                    className={`w-full flex items-center justify-between px-200 py-150 text-preset-4 transition-colors
                      ${disabled ? "text-grey-300 cursor-not-allowed" : "text-grey-900 hover:bg-beige-100"}`}
                  >
                    <span className="flex items-center gap-200">
                      <ColorDot color={color} size="md" />
                      <span className="capitalize">{color}</span>
                    </span>
                    {disabled && (
                      <span className="text-preset-5 text-grey-300">Already used</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
