import { env } from "@/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface PresignedUrlResponse {
  url: string;
  fields?: Record<string, string>;
}

export async function createPresignedUrl(
  fileName: string,
  fileType: string
): Promise<PresignedUrlResponse> {
  console.log("in s3 lib");

  const endpoint = env.S3_ENDPOINT;
  const bucket = env.S3_BUCKET;
  const region = env.S3_REGION;

  const s3Client = new S3Client({
    region: region || "auto",
    endpoint: endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY
    }

  });

  console.log({ fileName });

  const key = fileName;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: fileType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600 // URL expires in 1 hour
    });

    return {
      url: signedUrl,
    };
  } catch (error) {
    console.error("Error creating presigned URL:", error);
    throw new Error("Failed to create presigned URL");
  }
}