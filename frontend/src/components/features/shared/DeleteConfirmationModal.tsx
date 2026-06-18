import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  itemName,
  onConfirm,
  onClose,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete '${itemName}'?`}>
      <div className="flex flex-col gap-200">
        <p className="text-preset-4 text-grey-500">
          Are you sure you want to delete &lsquo;{itemName}&rsquo;? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <Button variant="destructive" className="w-full" onClick={onConfirm}>
          Yes, Confirm Deletion
        </Button>
        <Button variant="tertiary" className="self-center" onClick={onClose}>
          No, Go Back
        </Button>
      </div>
    </Modal>
  );
}
