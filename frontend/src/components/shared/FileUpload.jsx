"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { cn, validateFile, formatFileSize } from "@/utils/helpers";

export default function FileUpload({ onChange, error }) {
  const [preview, setPreview]     = useState(null);
  const [fileInfo, setFileInfo]   = useState(null);
  const [dragging, setDragging]   = useState(false);
  const [fileError, setFileError] = useState(null);
  const inputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file) return;
    const { valid, error: validErr } = validateFile(file);
    if (!valid) { setFileError(validErr); return; }
    setFileError(null);
    setFileInfo({ name: file.name, size: file.size });
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    onChange?.(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  }, [processFile]);

  const clear = () => {
    setPreview(null); setFileInfo(null); setFileError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--text-primary)]">
        File Upload <span className="text-red-500">*</span>
      </label>

      {preview ? (
        <div className="relative rounded-xl border border-[var(--border-color)] overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end p-3">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{fileInfo?.name}</p>
              <p className="text-white/70 text-xs">{formatFileSize(fileInfo?.size)}</p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="w-8 h-8 rounded-full bg-surface/20 hover:bg-surface/40 flex items-center justify-center text-white ml-2"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors",
            dragging
              ? "border-primary-400 bg-primary-50 dark:bg-primary-900/20"
              : "border-[var(--border-color)] hover:border-primary-400 hover:bg-[var(--bg-elevated)]"
          )}
        >
          <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
            <Upload size={22} className="text-[var(--text-muted)]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Drop your image here or <span className="text-primary-600">browse</span>
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">JPG, PNG, GIF · Max 10MB</p>
          </div>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/gif" onChange={(e) => processFile(e.target.files?.[0])} className="hidden" />
      {(fileError || error) && <p className="text-xs text-red-500">{fileError || error}</p>}
    </div>
  );
}
