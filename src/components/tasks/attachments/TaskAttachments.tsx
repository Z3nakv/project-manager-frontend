import { useState } from "react";
import { ArrowUpTrayIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { useTaskAttachments } from "../../../hooks/queries/useAttachmentsQueries";
import { useUploadAttachment } from "../../../hooks/mutations/useAttachmentMutations";
import ImageUploader from "../../attachments/ImageUploader";

export function TaskAttachments({ projectId, taskId }: { projectId: string; taskId: string }) {

  const { data: attachments, isLoading } = useTaskAttachments({ projectId, taskId });
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useUploadAttachment();

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    mutate({ projectId, taskId, formData });
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-text-muted uppercase tracking-wide flex items-center gap-1.5">
        <PaperClipIcon className="h-3.5 w-3.5 text-text-muted" />
        Adjuntos
      </label>

      <ImageUploader onFileSelect={setFile} disabled={isPending} />

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || isPending}
        className="w-full flex items-center justify-center gap-2 bg-surface-base hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed border border-border text-text-secondary hover:text-text-primary text-xs font-medium py-2 rounded-lg transition-colors duration-150 cursor-pointer shadow-xs"
      >
        <ArrowUpTrayIcon className="h-3.5 w-3.5" />
        {isPending ? "Subiendo..." : "Subir imagen"}
      </button>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-bg-alt animate-pulse" />
          ))}
        </div>
      ) : attachments && attachments.length > 0 ? (
        <ul className="grid grid-cols-4 gap-2">
          {attachments.map((att) => (
            <li key={att._id} className="relative aspect-square rounded-lg overflow-hidden border border-border">
              <img src={att.url} alt={att.filename} className="w-full h-full object-cover" />
              <div
                className="absolute top-0 right-0 w-3.5 h-3.5 bg-surface-hover"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}