"use server";

import { db } from "@/db";
import { NewResource, resource } from "@/db/schema/resource-schema";
import { createPresignedUrl } from "@/lib/s3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getResourcePresignedUrl(fileName: string, fileType: string) {
  try {
    const presignedUrl = await createPresignedUrl(fileName, fileType);
    return { success: true, data: presignedUrl };
  } catch (error) {
    console.error("Error generating presigned URL for resource:", error);
    return { success: false, error: "Failed to generate upload URL for resource" };
  }
}

export async function createResource(resourceData: NewResource) {
  try {
    const newResource = await db.insert(resource).values(resourceData).returning();
    revalidatePath("/admin/resources");
    return { success: true, data: newResource[0] };
  } catch (error) {
    console.error("Error creating resource:", error);
    return { success: false, error: "Failed to create resource" };
  }
}

export async function getResources() {
  try {
    const resources = await db.select().from(resource);
    return { success: true, data: resources };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { success: false, error: "Failed to fetch resources" };
  }
}

export async function updateResource(id: string, resourceData: Partial<NewResource>) {
  try {
    const updatedResource = await db.update(resource).set(resourceData).where(eq(resource.id, id)).returning();
    return { success: true, data: updatedResource[0] };
  } catch (error) {
    console.error(`Error updating resource with ID ${id}:`, error);
    return { success: false, error: `Failed to update resource with ID ${id}` };
  }
}

export async function deleteResource(id: string) {
  try {
    await db.delete(resource).where(eq(resource.id, id));
    revalidatePath("/admin/resources");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting resource with ID ${id}:`, error);
    return { success: false, error: `Failed to delete resource with ID ${id}` };
  }
}