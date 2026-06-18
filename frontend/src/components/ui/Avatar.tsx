import Image from "next/image";

interface AvatarProps {
  src?: string;
  fallbackColor?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "w-[32px] h-[32px] text-preset-5",
  md: "w-[40px] h-[40px] text-preset-4",
  lg: "w-[48px] h-[48px] text-preset-3",
};

const sizePx = {
  sm: 32,
  md: 40,
  lg: 48,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, fallbackColor, name, size = "md" }: AvatarProps) {
  const base = `rounded-full overflow-hidden shrink-0 flex items-center justify-center ${sizeStyles[size]}`;

  if (src) {
    return (
      <div className={base}>
        <Image
          src={src}
          alt={name ?? "avatar"}
          width={sizePx[size]}
          height={sizePx[size]}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  if (fallbackColor) {
    return (
      <div
        className={`${base} text-white font-bold`}
        style={{ backgroundColor: `var(--color-${fallbackColor})` }}
      >
        {name ? getInitials(name) : null}
      </div>
    );
  }

  return (
    <div className={`${base} bg-grey-300 text-grey-500 font-bold`}>
      {name ? getInitials(name) : "?"}
    </div>
  );
}
