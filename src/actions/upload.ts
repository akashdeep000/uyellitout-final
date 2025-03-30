"use server";

import { createPresignedUrl } from "@/lib/s3";

export async function getPresignedUrl(fileName: string, fileType: string) {
  try {
    const presignedUrl = await createPresignedUrl(fileName, fileType);
    return { success: true, data: presignedUrl };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return { success: false, error: "Failed to generate upload URL" };
  }
}