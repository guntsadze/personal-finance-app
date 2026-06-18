"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CardOptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CardOptionsMenu({ onEdit, onDelete }: CardOptionsMenuProps) {
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
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-grey-500 hover:text-grey-900 transition-colors"
        aria-label="Options"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-50 bg-white border border-grey-300 rounded-lg py-50 z-10 min-w-[120px] shadow-sm">
          <button
            type="button"
            className="w-full text-left px-200 py-150 text-preset-4 text-grey-500 hover:text-grey-900 transition-colors"
            onClick={() => { setOpen(false); onEdit(); }}
          >
            Edit
          </button>
          <hr className="border-grey-100 mx-200" />
          <button
            type="button"
            className="w-full text-left px-200 py-150 text-preset-4 text-red hover:text-red/80 transition-colors"
            onClick={() => { setOpen(false); onDelete(); }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
