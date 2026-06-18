interface ColorDotProps {
  color: string;
  size?: "sm" | "md";
}

const sizeStyles = {
  sm: "w-[8px] h-[8px]",
  md: "w-[12px] h-[12px]",
};

export function ColorDot({ color, size = "md" }: ColorDotProps) {
  return (
    <span
      className={`inline-block rounded-full shrink-0 ${sizeStyles[size]}`}
      style={{ backgroundColor: `var(--color-${color})` }}
    />
  );
}
