"use client";

import { createResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Resource } from "@/db/schema/resource-schema";
import { useUpload } from "@/hooks/use-upload";
import { useState } from "react";

interface ResourceFormProps {
  onResourceAdded: (newResource: Resource) => void;
}

export default function ResourceForm({ onResourceAdded }: ResourceFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { uploadFile, isLoading, uploads } = useUpload();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file || !title) {
      setError("Title and file are required.");
      return;
    }

    try {
      // 1. Upload file using the useUpload hook
      const uploadResult = await uploadFile(file);
      const filePath = await uploadResult.promise; // filePath will be the public URL

      // 2. Create resource entry in the database
      const resourceData = {
        title,
        description,
        filePath: filePath,
      };

      const createResourceResult = await createResource(resourceData);

      if (!createResourceResult.success) {
        setError(createResourceResult.error || "Failed to create resource entry.");
        // Consider deleting the S3 file here if database entry fails
        return;
      }

      setSuccess(true);
      setTitle("");
      setDescription("");
      setFile(null);
      if (createResourceResult.success && createResourceResult.data) {
        onResourceAdded(createResourceResult.data);
      }

    } catch (err) {
      console.error("Error during resource creation:", err);
      setError("An unexpected error occurred during file upload or resource creation.");
    }
  };

  // Basic upload progress display (can be enhanced)
  const firstUpload = uploads.size > 0 ? uploads.values().next().value : null;
  const uploadProgress = firstUpload ? firstUpload.progress : null;
  const isUploading = isLoading || (uploadProgress !== null && uploadProgress.percentage < 100);


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description:</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="file">PDF File:</Label>
        <Input
          type="file"
          id="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required
        />
      </div>
      <Button type="submit" disabled={isUploading}>
        {isUploading ? `Uploading... ${uploadProgress ? uploadProgress.percentage : 0}%` : "Add Resource"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Resource added successfully!</p>}
    </form>
  );
}