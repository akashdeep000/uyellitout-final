"use client";

import { Resource } from "@/db/schema/resource-schema";
import { useState } from "react";
import ResourceForm from "./ResourceForm";
import ResourceList from "./ResourceList";

interface AdminResourcesClientProps {
  initialResources: Resource[];
}

export default function AdminResourcesClient({ initialResources }: AdminResourcesClientProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const handleResourceAdded = (newResource: Resource) => {
    setResources([...resources, newResource]);
  };

  const handleResourceUpdated = (updatedResource: Resource) => {
    setResources(resources.map(resource =>
      resource.id === updatedResource.id ? updatedResource : resource
    ));
  };

  const handleResourceDeleted = (deletedResourceId: string) => {
    setResources(resources.filter(resource => resource.id !== deletedResourceId));
  };


  return (
    <div className="p-2 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Free Resources</h1>
        <p className="text-gray-500">Manage free resources here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
          <ResourceForm onResourceAdded={handleResourceAdded} />
        </div>
        <div>
          <ResourceList
            resources={resources}
            onResourceUpdated={handleResourceUpdated}
            onResourceDeleted={handleResourceDeleted}
          />
        </div>
      </div>
    </div>
  );
}