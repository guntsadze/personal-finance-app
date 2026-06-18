"use client";

import { useMemo, useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { ListToolbar } from "@/components/ui/ListToolbar";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { Pagination } from "@/components/ui/Pagination";
import { TransactionsTable } from "@/components/features/transactions/TransactionsTable";
import { CATEGORIES } from "@/lib/constants";
import type { Transaction } from "@/types/transaction";

const SORT_OPTIONS = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
const CATEGORY_OPTIONS = ["All Transactions", ...CATEGORIES];
const PER_PAGE = 10;

function sortTransactions(list: Transaction[], sort: string): Transaction[] {
  const copy = [...list];
  switch (sort) {
    case "Oldest":  return copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "A to Z":  return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "Z to A":  return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "Highest": return copy.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    case "Lowest":  return copy.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
    default:        return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export default function TransactionsPage() {
  const { data, loading, error, refetch } = useTransactions();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");
  const [category, setCategory] = useState("All Transactions");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (search) list = list.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All Transactions") list = list.filter((t) => t.category === category);
    return sortTransactions(list, sort);
  }, [data, search, sort, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handleSort(v: string)   { setSort(v);   setPage(1); }
  function handleCategory(v: string) { setCategory(v); setPage(1); }

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[200px]" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Couldn't load transactions." onRetry={refetch} />;
  }

  return (
    <div className="flex flex-col gap-300">
      <PageHeader title="Transactions" />

      <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
        <ListToolbar
          searchPlaceholder="Search transaction"
          searchValue={search}
          onSearchChange={handleSearch}
          sortOptions={SORT_OPTIONS}
          selectedSort={sort}
          onSortChange={handleSort}
        >
          <DropdownMenu
            options={CATEGORY_OPTIONS}
            selected={category}
            onSelect={handleCategory}
            label="Category"
          />
        </ListToolbar>

        {filtered.length === 0 ? (
          <EmptyState message="No transactions match your search." />
        ) : (
          <>
            <TransactionsTable transactions={paginated} />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
