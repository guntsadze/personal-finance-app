"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { ColorTagSelect } from "@/components/ui/ColorTagSelect";
import { CATEGORIES } from "@/lib/constants";
import type { BudgetFormValues } from "@/validation/budget-schema";

interface BudgetFormModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialValues?: { category: string; maximum: number; color: string };
  usedColors?: string[];
  onSubmit: (values: BudgetFormValues) => void;
  onClose: () => void;
}

export function BudgetFormModal({
  isOpen,
  mode,
  initialValues,
  usedColors = [],
  onSubmit,
  onClose,
}: BudgetFormModalProps) {
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [maximum, setMaximum] = useState(initialValues?.maximum?.toString() ?? "");
  const [color, setColor] = useState(initialValues?.color ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setCategory(initialValues?.category ?? "");
      setMaximum(initialValues?.maximum?.toString() ?? "");
      setColor(initialValues?.color ?? "");
      setErrors({});
    }
  }, [isOpen, initialValues?.category, initialValues?.maximum, initialValues?.color]);

  const title = mode === "add" ? "Add New Budget" : "Edit Budget";
  const submitLabel = mode === "add" ? "Add Budget" : "Save Changes";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!category) next.category = "Category is required";
    const maxNum = parseFloat(maximum);
    if (!maximum || isNaN(maxNum) || maxNum <= 0) next.maximum = "Enter a valid amount greater than 0";
    if (!color) next.color = "Please select a theme color";
    if (Object.keys(next).length > 0) { setErrors(next); return; }
    onSubmit({ category, maximum: maxNum, color } as BudgetFormValues);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-200">
        <div className="flex flex-col gap-100">
          <label className="text-preset-5-bold text-grey-500">Budget Category</label>
          <DropdownMenu
            options={[...CATEGORIES]}
            selected={category}
            onSelect={setCategory}
            placeholder="Select Category"
          />
          {errors.category && <p className="text-preset-5 text-red">{errors.category}</p>}
        </div>

        <Input
          variant="prefix"
          label="Maximum Spend"
          prefix="$"
          placeholder="e.g. 200"
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
          error={errors.maximum}
        />

        <ColorTagSelect value={color} onChange={setColor} usedColors={usedColors} />
        {errors.color && <p className="text-preset-5 text-red">{errors.color}</p>}

        <Button type="submit" variant="primary" className="w-full mt-100">
          {submitLabel}
        </Button>
      </form>
    </Modal>
  );
}
