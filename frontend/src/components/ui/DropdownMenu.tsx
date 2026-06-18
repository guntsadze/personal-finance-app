"use client";

import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface DropdownMenuProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function DropdownMenu({
  options,
  selected,
  onSelect,
  label,
  placeholder = "Select…",
}: DropdownMenuProps) {
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
    <div className="relative inline-block" ref={ref}>
      {label && (
        <p className="text-preset-5-bold text-grey-500 mb-100">{label}</p>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-200 bg-white border border-grey-300 rounded-lg px-200 py-150 text-preset-4 text-grey-900 min-w-[160px] focus:outline-none focus:border-grey-900 transition-colors"
      >
        <span className={selected ? "text-grey-900" : "text-grey-500"}>
          {selected || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-grey-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-50 w-full bg-white border border-grey-300 rounded-lg py-50 shadow-sm overflow-hidden">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-200 py-150 text-preset-4 transition-colors hover:text-grey-900 ${
                  option === selected
                    ? "text-grey-900 font-bold"
                    : "text-grey-500"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
