"use client";

import { updateResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Resource } from "@/db/schema/resource-schema";
import { useEffect, useState } from "react";


interface EditResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  onUpdate: (updatedResource: Resource) => void;
}

export default function EditResourceModal({ resource, onClose, onUpdate }: EditResourceModalProps) {
  const [title, setTitle] = useState(resource?.title || "");
  const [description, setDescription] = useState(resource?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
      setDescription(resource.description || "");
    }
  }, [resource]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resource) return;

    setLoading(true);
    setError(null);

    const updatedData = {
      title,
      description,
      // File upload is not handled in this modal for simplicity.
      // A more complex implementation would allow replacing the file.
    };

    const result = await updateResource(resource.id, updatedData);

    if (result.success && result.data) {
      onUpdate(result.data);
      onClose();
    } else {
      setError(result.error || "Failed to update resource.");
    }
    setLoading(false);
  };


  return (
    <Dialog open={!!resource} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-title" className="text-right">
              Title
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500 text-sm col-span-4 text-center">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}