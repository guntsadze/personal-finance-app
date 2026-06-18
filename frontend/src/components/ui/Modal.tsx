import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-grey-900/50 p-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[440px] p-300 flex flex-col gap-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-preset-2 text-grey-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-grey-500 hover:text-grey-900 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
