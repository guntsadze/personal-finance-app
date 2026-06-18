"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/Input";
import { DropdownMenu } from "@/components/ui/DropdownMenu";

interface ListToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  sortOptions?: string[];
  selectedSort?: string;
  onSortChange?: (option: string) => void;
  children?: ReactNode;
}

export function ListToolbar({
  searchPlaceholder = "Search…",
  searchValue = "",
  onSearchChange,
  sortOptions = [],
  selectedSort = "",
  onSortChange,
  children,
}: ListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-200">
      <div className="flex-1 min-w-[200px]">
        <Input
          variant="icon"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      {children && <div>{children}</div>}
      {sortOptions.length > 0 && onSortChange && (
        <DropdownMenu
          options={sortOptions}
          selected={selectedSort}
          onSelect={onSortChange}
          label="Sort by"
        />
      )}
    </div>
  );
}
