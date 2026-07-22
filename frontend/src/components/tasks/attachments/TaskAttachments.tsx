import { useState } from "react";
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
    <div className="space-y-4">
      <ImageUploader onFileSelect={setFile} disabled={isPending} />
      <button onClick={handleUpload} disabled={!file || isPending}>
        {isPending ? "Subiendo..." : "Subir imagen"}
      </button>

      {isLoading ? (
        <p>Cargando attachments...</p>
      ) : (
        <ul className="grid grid-cols-4 gap-2">
          {attachments?.map((att) => (
            <li key={att._id}>
              <img src={att.url} alt={att.filename} className="rounded" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}