import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-preset-1 text-grey-900">{title}</h1>
      {action && <div>{action}</div>}
    </div>
  );
}
