"use client";

import { deleteResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";


import EditResourceModal from "./EditResourceModal";

import { Resource } from "@/db/schema/resource-schema";

interface ResourceListProps {
  resources: Resource[];
  onResourceUpdated: (updatedResource: Resource) => void;
  onResourceDeleted: (deletedResourceId: string) => void;
}

export default function ResourceList({ resources, onResourceUpdated, onResourceDeleted }: ResourceListProps) {
  const [resourceList, setResourceList] = useState<Resource[]>(resources);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  useEffect(() => {
    setResourceList(resources);
  }, [resources]);


  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setLoading(true);
      setError(null);
      const result = await deleteResource(id);
      if (result.success) {
        // Remove the deleted resource from the state
        onResourceDeleted(id);
      } else {
        setError(result.error || "Failed to delete resource.");
      }
      setLoading(false);
    }
  };

  const handleEditClick = (resource: Resource) => {
    setEditingResource(resource);
  };

  const handleUpdate = (updatedResource: Resource) => {
    onResourceUpdated(updatedResource);
  };

  const handleCloseModal = () => {
    setEditingResource(null);
  };


  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Resources</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {resourceList.length === 0 && !loading ? (
        <p>No resources found.</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>File Path</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resourceList.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <a href={resource.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {resource.filePath}
                    </a>
                  </TableCell>
                  <TableCell className="text-right space-y-2">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(resource)} disabled={loading}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id, resource.title)} disabled={loading}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EditResourceModal
        resource={editingResource}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </div>
  );
}