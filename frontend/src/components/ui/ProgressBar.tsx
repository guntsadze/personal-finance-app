interface ProgressBarProps {
  color: string;
  percentage: number;
}

export function ProgressBar({ color, percentage }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  return (
    <div className="w-full h-[8px] rounded-full bg-beige-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${clamped}%`,
          backgroundColor: `var(--color-${color})`,
        }}
      />
    </div>
  );
}
