// components/attachments/ImageUploader.tsx
import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

type ImageUploaderProps = {
  onFileSelect: (file: File | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
};

const MAX_SIZE_DEFAULT = 5; // MB, debe coincidir con tu límite de multer en backend

export default function ImageUploader({
  onFileSelect,
  maxSizeMB = MAX_SIZE_DEFAULT,
  disabled = false,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen");
      onFileSelect(null);
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`El archivo excede el límite de ${maxSizeMB}MB`);
      onFileSelect(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed
            p-8 cursor-pointer transition-colors
            ${isDragging ? "border-indigo-500 bg-indigo-500/10" : "border-gray-700 bg-[#0f1117]"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-500"}
          `}
        >
          <PhotoIcon className="h-10 w-10 text-gray-500" />
          <p className="text-sm text-gray-400">
            <span className="text-indigo-400 font-medium">Haz clic para subir</span> o arrastra una imagen
          </p>
          <p className="text-xs text-gray-600">PNG, JPG hasta {maxSizeMB}MB</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-700">
          <img src={preview} alt="Preview" className="w-full max-h-64 object-center" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black/90 transition-colors"
            aria-label="Quitar imagen"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}