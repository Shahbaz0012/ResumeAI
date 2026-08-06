interface ConfirmDeleteModalProps {
  isOpen: boolean;
  loading?: boolean;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  loading = false,
  title = "this resume",
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white">
          Delete Resume
        </h2>

        <p className="mt-4 leading-7 text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {title}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-3
              text-white
              transition
              hover:bg-white/10
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}