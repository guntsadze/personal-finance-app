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
import {
  createTransaction,
  updateTransaction,
} from "@/services/transactions.service";

const SORT_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];
const CATEGORY_OPTIONS = ["All Transactions", ...CATEGORIES];
const PER_PAGE = 10;

function sortTransactions(list: Transaction[], sort: string): Transaction[] {
  const copy = [...list];
  switch (sort) {
    case "Oldest":
      return copy.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    case "A to Z":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "Z to A":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "Highest":
      return copy.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    case "Lowest":
      return copy.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
    default:
      return copy.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  }
}

export default function TransactionsPage() {
  const { data, loading, error, refetch } = useTransactions();

  // ფილტრაციის სთეითები
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");
  const [category, setCategory] = useState("All Transactions");
  const [page, setPage] = useState(1);

  // მოდალისა და ფორმის სთეითები
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: CATEGORIES[0],
    amount: "",
    recurring: false,
  });

  // Client-side ფილტრაცია და სორტირება (შენი დაწერილი ლოგიკა)
  const filtered = useMemo(() => {
    let list = data ?? [];
    if (search)
      list = list.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()),
      );
    if (category !== "All Transactions")
      list = list.filter((t) => t.category === category);
    return sortTransactions(list, sort);
  }, [data, search, sort, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // მოდალის გახსნა ახალი ტრანზაქციისთვის
  function handleOpenAddModal() {
    setEditingTransaction(null);
    setFormData({
      name: "",
      category: CATEGORIES[0],
      amount: "",
      recurring: false,
    });
    setIsModalOpen(true);
  }

  // მოდალის გახსნა რედაქტირებისთვის
  function handleOpenEditModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setFormData({
      name: transaction.name,
      category: transaction.category,
      amount: transaction.amount.toString(),
      recurring: transaction.recurring ?? false,
    });
    setIsModalOpen(true);
  }

  // ფორმის დასაბმიტება შენი API სერვისების გამოყენებით
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: editingTransaction
        ? editingTransaction.date
        : new Date().toISOString(),
      recurring: formData.recurring,
    };

    try {
      if (editingTransaction) {
        // ვიყენებთ შენს updateTransaction-ს
        await updateTransaction(editingTransaction.id, payload);
      } else {
        // ვიყენებთ შენს createTransaction-ს
        await createTransaction(payload);
      }

      setIsModalOpen(false);
      refetch(); // მონაცემების ხელახლა წამოღება (Refresh)
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[200px]" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Couldn't load transactions." onRetry={refetch} />
    );
  }

  return (
    <div className="flex flex-col gap-300">
      <div className="flex items-center justify-between">
        <PageHeader title="Transactions" />
        <button
          onClick={handleOpenAddModal}
          className="bg-grey-900 text-white text-preset-4-bold px-250 py-150 rounded-lg hover:bg-grey-500 transition-colors"
        >
          + Add Transaction
        </button>
      </div>

      <div className="bg-white rounded-2xl p-300 flex flex-col gap-300">
        <ListToolbar
          searchPlaceholder="Search transaction"
          searchValue={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          sortOptions={SORT_OPTIONS}
          selectedSort={sort}
          onSortChange={(v) => {
            setSort(v);
            setPage(1);
          }}
        >
          <DropdownMenu
            options={CATEGORY_OPTIONS}
            selected={category}
            onSelect={(v) => {
              setCategory(v);
              setPage(1);
            }}
            label="Category"
          />
        </ListToolbar>

        {filtered.length === 0 ? (
          <EmptyState message="No transactions match your search." />
        ) : (
          <>
            {/* გადაეცემა ედიტის ფუნქცია ცხრილის კომპონენტს შიგნიდან გამოსაძახებლად */}
            <TransactionsTable
              transactions={paginated}
              onEditClick={handleOpenEditModal}
            />
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

      {/* მოდალური ფანჯარა */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-200">
          <div className="bg-white rounded-2xl p-400 w-full max-w-[480px] flex flex-col gap-300">
            <h2 className="text-preset-2 text-grey-900">
              {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-250">
              <div className="flex flex-col gap-100">
                <label className="text-preset-5 text-grey-500">
                  Transaction Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-grey-300 rounded-lg p-150 text-preset-4 text-grey-900 focus:outline-grey-900"
                />
              </div>

              <div className="flex flex-col gap-100">
                <label className="text-preset-5 text-grey-500">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="border border-grey-300 rounded-lg p-150 text-preset-4 text-grey-900 bg-white focus:outline-grey-900"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-100">
                <label className="text-preset-5 text-grey-500">
                  Amount (Use minus for expenses)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="e.g. -25.50 or 100"
                  className="border border-grey-300 rounded-lg p-150 text-preset-4 text-grey-900 focus:outline-grey-900"
                />
              </div>

              {/* Recurring ჩეკბოქსი შენი ახალი სქემის ველის მიხედვით */}
              <div className="flex items-center gap-150 py-100">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.recurring}
                  onChange={(e) =>
                    setFormData({ ...formData, recurring: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-grey-900 accent-grey-900"
                />
                <label
                  htmlFor="recurring"
                  className="text-preset-4 text-grey-700 cursor-pointer"
                >
                  This is a recurring bill
                </label>
              </div>

              <div className="flex justify-end gap-150 mt-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-grey-500 text-preset-4 px-200 py-150 hover:text-grey-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-grey-900 text-white text-preset-4-bold px-250 py-150 rounded-lg hover:bg-grey-500"
                >
                  {editingTransaction ? "Save Changes" : "Add Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
