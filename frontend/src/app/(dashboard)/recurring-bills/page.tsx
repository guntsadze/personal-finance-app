"use client";

import { useMemo, useState } from "react";
import { useRecurringBills } from "@/hooks/use-recurring-bills";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { ListToolbar } from "@/components/ui/ListToolbar";
import { RecurringBillRow } from "@/components/features/recurring-bills/RecurringBillRow";
import { formatCurrency } from "@/lib/format-currency";
import { Receipt } from "lucide-react";
import type { RecurringBill } from "@/types/recurring-bill";

const SORT_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

function sortBills(list: RecurringBill[], sort: string): RecurringBill[] {
  const copy = [...list];
  switch (sort) {
    case "A to Z":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "Z to A":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "Highest":
      return copy.sort((a, b) => b.amount - a.amount);
    case "Lowest":
      return copy.sort((a, b) => a.amount - b.amount);
    default:
      return copy;
  }
}

export default function RecurringBillsPage() {
  const { data, loading, error, refetch } = useRecurringBills();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");

  const bills = data ?? [];

  const paid = useMemo(() => bills.filter((b) => b.status === "paid"), [bills]);
  const upcoming = useMemo(
    () => bills.filter((b) => b.status === "upcoming"),
    [bills],
  );
  const dueSoon = useMemo(
    () => bills.filter((b) => b.status === "due-soon"),
    [bills],
  );

  const totalBills = useMemo(
    () => bills.reduce((s, b) => s + b.amount, 0),
    [bills],
  );

  const filtered = useMemo(() => {
    let list = bills;
    if (search)
      list = list.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase()),
      );
    return sortBills(list, sort);
  }, [bills, search, sort]);

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-300">
          <div className="flex flex-col gap-300">
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[200px]" />
          </div>
          <Skeleton className="h-[500px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Couldn't load recurring bills."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="flex flex-col gap-300">
      <PageHeader title="Recurring Bills" />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-300 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-300">
          {/* Total bills hero card */}
          <div className="bg-grey-900 rounded-2xl p-300 flex flex-col gap-300">
            <Receipt size={32} className="text-white" />
            <div>
              <p className="text-preset-4 text-white/70 mb-100">Total Bills</p>
              <p className="text-preset-1 text-white">
                {formatCurrency(totalBills)}
              </p>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl p-300 flex flex-col gap-200">
            <h2 className="text-preset-3 text-grey-900">Summary</h2>
            <div className="flex items-center justify-between py-150 border-b border-grey-100">
              <span className="text-preset-4 text-grey-500">Paid Bills</span>
              <span className="text-preset-4-bold text-grey-900">
                {paid.length} (
                {formatCurrency(paid.reduce((s, b) => s + b.amount, 0))})
              </span>
            </div>
            <div className="flex items-center justify-between py-150 border-b border-grey-100">
              <span className="text-preset-4 text-grey-500">
                Total Upcoming
              </span>
              <span className="text-preset-4-bold text-grey-900">
                {upcoming.length} (
                {formatCurrency(upcoming.reduce((s, b) => s + b.amount, 0))})
              </span>
            </div>
            <div className="flex items-center justify-between py-150">
              <span className="text-preset-4 text-red">Due Soon</span>
              <span className="text-preset-4-bold text-red">
                {dueSoon.length} (
                {formatCurrency(dueSoon.reduce((s, b) => s + b.amount, 0))})
              </span>
            </div>
          </div>
        </div>

        {/* Right column — bill list */}
        <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
          <ListToolbar
            searchPlaceholder="Search bills"
            searchValue={search}
            onSearchChange={setSearch}
            sortOptions={SORT_OPTIONS}
            selectedSort={sort}
            onSortChange={setSort}
          />

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-200 pb-100 border-b border-grey-100">
            <span className="text-preset-5 text-grey-500">Bill Title</span>
            <span className="text-preset-5 text-grey-500">Due Date</span>
            <span className="text-preset-5 text-grey-500 text-right">
              Amount
            </span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message="No bills match your search." />
          ) : (
            <div className="flex flex-col">
              {filtered.map((bill) => (
                <RecurringBillRow key={bill.id} bill={bill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
