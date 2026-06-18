import { Avatar } from "@/components/ui/Avatar";

interface RecipientListItemProps {
  name: string;
  category?: string;
  avatarUrl?: string;
  avatarColor?: string;
  amount?: number;
  date?: string;
}

export function RecipientListItem({
  name,
  category,
  avatarUrl,
  avatarColor,
  amount,
  date,
}: RecipientListItemProps) {
  const isPositive = amount !== undefined && amount > 0;

  return (
    <div className="flex items-center gap-200 py-200">
      <Avatar
        src={avatarUrl}
        fallbackColor={avatarColor}
        name={name}
        size="md"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-preset-4-bold text-grey-900 truncate">{name}</span>
        {category && (
          <span className="text-preset-5 text-grey-500 truncate">{category}</span>
        )}
      </div>
      {(amount !== undefined || date) && (
        <div className="flex flex-col items-end shrink-0">
          {amount !== undefined && (
            <span
              className={`text-preset-4-bold ${isPositive ? "text-green" : "text-grey-900"}`}
            >
              {isPositive ? "+" : ""}
              {amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          )}
          {date && (
            <span className="text-preset-5 text-grey-500">{date}</span>
          )}
        </div>
      )}
    </div>
  );
}
