import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-200 py-500 text-center">
      <AlertCircle size={48} className="text-red" />
      <p className="text-preset-4 text-grey-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-preset-4-bold text-grey-900 underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
