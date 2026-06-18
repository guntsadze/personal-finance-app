"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ColorTagSelect } from "@/components/ui/ColorTagSelect";
import type { PotFormValues } from "@/validation/pot-schema";

interface PotFormModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialValues?: { name: string; target: number; color: string };
  usedColors?: string[];
  onSubmit: (values: PotFormValues) => void;
  onClose: () => void;
}

export function PotFormModal({
  isOpen,
  mode,
  initialValues,
  usedColors = [],
  onSubmit,
  onClose,
}: PotFormModalProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [target, setTarget] = useState(initialValues?.target?.toString() ?? "");
  const [color, setColor] = useState(initialValues?.color ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setName(initialValues?.name ?? "");
      setTarget(initialValues?.target?.toString() ?? "");
      setColor(initialValues?.color ?? "");
      setErrors({});
    }
  }, [isOpen, initialValues?.name, initialValues?.target, initialValues?.color]);

  const title = mode === "add" ? "Add New Pot" : "Edit Pot";
  const submitLabel = mode === "add" ? "Add Pot" : "Save Changes";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Pot name is required";
    if (name.length > 30) next.name = "Pot name must be 30 characters or fewer";
    const tgtNum = parseFloat(target);
    if (!target || isNaN(tgtNum) || tgtNum <= 0) next.target = "Enter a valid target greater than 0";
    if (!color) next.color = "Please select a theme color";
    if (Object.keys(next).length > 0) { setErrors(next); return; }
    onSubmit({ name: name.trim(), target: tgtNum, color } as PotFormValues);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-200">
        <Input
          variant="basic"
          label="Pot Name"
          placeholder="e.g. Rainy Days"
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <Input
          variant="prefix"
          label="Target"
          prefix="$"
          placeholder="e.g. 2000"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          error={errors.target}
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
