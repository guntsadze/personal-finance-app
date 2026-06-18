"use client";

import { useState } from "react";
import { usePots } from "@/hooks/use-pots";
import { createPot, updatePot, deletePot } from "@/services/pots.service";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { PotCard } from "@/components/features/pots/PotCard";
import { PotFormModal } from "@/components/features/pots/PotFormModal";
import { DeleteConfirmationModal } from "@/components/features/shared/DeleteConfirmationModal";
import type { Pot } from "@/types/pot";
import type { PotFormValues } from "@/validation/pot-schema";

export default function PotsPage() {
  const { data, loading, error, refetch } = usePots();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Pot | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Pot | null>(null);

  async function handleSubmit(values: PotFormValues) {
    try {
      if (editTarget) {
        await updatePot(editTarget.id, values);
      } else {
        await createPot(values);
      }
    } catch { /* backend not live yet */ }
    setFormOpen(false);
    setEditTarget(null);
    refetch();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try { await deletePot(deleteTarget.id); } catch { /* backend not live yet */ }
    setDeleteTarget(null);
    refetch();
  }

  function openEdit(pot: Pot) {
    setEditTarget(pot);
    setFormOpen(true);
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-300">
        <Skeleton className="h-[40px] w-[160px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          <Skeleton className="h-[320px]" />
          <Skeleton className="h-[320px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Couldn't load pots." onRetry={refetch} />;
  }

  const pots = data ?? [];
  const usedColors = pots.map((p) => p.color);

  return (
    <div className="flex flex-col gap-300">
      <PageHeader
        title="Pots"
        action={
          <Button variant="primary" onClick={() => { setEditTarget(null); setFormOpen(true); }}>
            + Add New Pot
          </Button>
        }
      />

      {pots.length === 0 ? (
        <EmptyState message="No pots yet." description="Create a pot to start saving toward a goal." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          {pots.map((pot) => (
            <PotCard
              key={pot.id}
              pot={pot}
              onEdit={() => openEdit(pot)}
              onDelete={() => setDeleteTarget(pot)}
              onAddMoney={() => {/* TODO: Add Money modal */}}
              onWithdraw={() => {/* TODO: Withdraw modal */}}
            />
          ))}
        </div>
      )}

      <PotFormModal
        isOpen={formOpen}
        mode={editTarget ? "edit" : "add"}
        initialValues={
          editTarget
            ? { name: editTarget.name, target: editTarget.target, color: editTarget.color }
            : undefined
        }
        usedColors={editTarget ? usedColors.filter((c) => c !== editTarget.color) : usedColors}
        onSubmit={handleSubmit}
        onClose={() => { setFormOpen(false); setEditTarget(null); }}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        itemName={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
