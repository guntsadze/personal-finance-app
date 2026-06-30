"use client";

import { useState } from "react";
import { useBudgets } from "@/hooks/use-budgets";
import {
  createBudget,
  updateBudget,
  deleteBudget,
} from "@/services/budgets.service";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { BudgetsSummaryCard } from "@/components/features/overview/BudgetsSummaryCard";
import { BudgetCategoryCard } from "@/components/features/budgets/BudgetCategoryCard";
import { BudgetFormModal } from "@/components/features/budgets/BudgetFormModal";
import { DeleteConfirmationModal } from "@/components/features/shared/DeleteConfirmationModal";
import type { Budget } from "@/types/budget";
import type { BudgetFormValues } from "@/validation/budget-schema";

export default function BudgetsPage() {
  const { data, loading, error, refetch } = useBudgets();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Budget | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Budget | null>(null);

  async function handleSubmit(values: BudgetFormValues) {
    try {
      if (editTarget) {
        await updateBudget(editTarget._id, values);
      } else {
        await createBudget(values);
      }
    } catch {
      /* backend not live yet */
    }
    setFormOpen(false);
    setEditTarget(null);
    refetch();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBudget(deleteTarget._id);
    } catch {
      /* backend not live yet */
    }
    setDeleteTarget(null);
    refetch();
  }

  function openEdit(budget: Budget) {
    setEditTarget(budget);
    setFormOpen(true);
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          <Skeleton className="h-[400px]" />
          <div className="flex flex-col gap-300">
            <Skeleton className="h-[240px]" />
            <Skeleton className="h-[240px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Couldn't load budgets." onRetry={refetch} />;
  }

  const budgets = data ?? [];
  const usedColors = budgets.map((b) => b.color);

  return (
    <div className="flex flex-col gap-300">
      <PageHeader
        title="Budgets"
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
          >
            + Add New Budget
          </Button>
        }
      />

      {budgets.length === 0 ? (
        <EmptyState
          message="No budgets yet."
          description="Add a budget to start tracking your spending."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300 items-start">
          {/* Left — donut summary */}
          <BudgetsSummaryCard budgets={budgets} />

          {/* Right — individual cards */}
          <div className="flex flex-col gap-300">
            {budgets.map((budget) => (
              <BudgetCategoryCard
                key={budget._id}
                budget={budget}
                onEdit={() => openEdit(budget)}
                onDelete={() => setDeleteTarget(budget)}
              />
            ))}
          </div>
        </div>
      )}

      <BudgetFormModal
        isOpen={formOpen}
        mode={editTarget ? "edit" : "add"}
        initialValues={
          editTarget
            ? {
                category: editTarget.category,
                maximum: editTarget.maximum,
                color: editTarget.color,
              }
            : undefined
        }
        usedColors={
          editTarget
            ? usedColors.filter((c) => c !== editTarget.color)
            : usedColors
        }
        onSubmit={handleSubmit}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        itemName={deleteTarget?.category ?? ""}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
