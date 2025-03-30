import { getPresignedUrl } from "@/actions/upload";
import { useCallback, useState } from "react";
import { ulid } from "ulid";

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUpload {
  id: string;
  stage: "preparing" | "uploading" | "complete";
  progress: UploadProgress | null;
  error: string | null;
  url: string | null;
}

export function useUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploads, setUploads] = useState<Map<string, FileUpload>>(new Map());

  const getUploadProgress = useCallback((uploadId: string) => {
    return uploads.get(uploadId);
  }, [uploads]);

  const createUploadId = useCallback(() => {
    return ulid();
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<{ uploadId: string; promise: Promise<string> }> => {
    const uploadId = createUploadId();
    // eslint-disable-next-line n/no-process-env
    const generatedKey = `${process.env.NODE_ENV === "production" ? "uploads" : "dev-uploads"}/${uploadId}${file.name.split(".").pop() ? `.${file.name.split(".").pop()}` : ""}`;

    setUploads(prev => new Map(prev).set(uploadId, {
      id: uploadId,
      stage: "preparing",
      progress: { loaded: 0, total: 100, percentage: 0 },
      error: null,
      url: null
    }));

    const uploadPromise = new Promise<string>(async (resolve, reject) => {
      try {
        setIsLoading(true);

        setUploads(prev => {
          const current = prev.get(uploadId);
          if (current) {
            const updated = new Map(prev);
            updated.set(uploadId, {
              ...current,
              progress: { loaded: 20, total: 100, percentage: 20 }
            });
            return updated;
          }
          return prev;
        });

        const result = await getPresignedUrl(generatedKey, file.type);

        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to get upload URL");
        }

        const { url, fields } = result.data;

        setUploads(prev => {
          const current = prev.get(uploadId);
          if (current) {
            const updated = new Map(prev);
            updated.set(uploadId, {
              ...current,
              stage: "uploading",
              progress: { loaded: 30, total: 100, percentage: 30 }
            });
            return updated;
          }
          return prev;
        });

        const formData = new FormData();
        if (fields) {
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });
        }
        formData.append("data", file);

        // Use XMLHttpRequest for upload progress tracking
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded * 100) / event.total)
            };
            setUploads(prev => {
              const current = prev.get(uploadId);
              if (current) {
                const updated = new Map(prev);
                updated.set(uploadId, { ...current, progress });
                return updated;
              }
              return prev;
            });
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // eslint-disable-next-line n/no-process-env
            const publicUrl = `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${generatedKey}`;
            setUploads(prev => {
              const current = prev.get(uploadId);
              if (current) {
                const updated = new Map(prev);
                updated.set(uploadId, {
                  ...current,
                  url: publicUrl,
                  stage: "complete",
                  progress: { loaded: 100, total: 100, percentage: 100 }
                });
                return updated;
              }
              return prev;
            });
            resolve(publicUrl);
          } else {
            throw new Error("Upload failed");
          }
        });

        xhr.addEventListener("error", () => {
          const error = "Upload failed";
          setUploads(prev => {
            const current = prev.get(uploadId);
            if (current) {
              const updated = new Map(prev);
              updated.set(uploadId, { ...current, error });
              return updated;
            }
            return prev;
          });
          reject(new Error(error));
        });

        xhr.open("PUT", url);
        xhr.send(file);
      } catch (err) {
        console.log(err);

        const error = err instanceof Error ? err.message : "Upload failed";
        setUploads(prev => {
          const current = prev.get(uploadId);
          if (current) {
            const updated = new Map(prev);
            updated.set(uploadId, { ...current, error });
            return updated;
          }
          return prev;
        });
        reject(err);
      } finally {
        setIsLoading(false);
      }
    });

    return { uploadId, promise: uploadPromise };
  }, [createUploadId]);

  const removeUpload = useCallback((uploadId: string) => {
    setUploads(prev => {
      const updated = new Map(prev);
      updated.delete(uploadId);
      return updated;
    });
  }, []);

  return {
    uploadFile,
    getUploadProgress,
    removeUpload,
    isLoading,
    uploads
  };
}