import { UploadApiResponse,v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

// Validate required environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const folder = 'cars';
const resourceType = 'image';

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Missing required Cloudinary environment variables');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

type CloudinaryFile = {
  originalname: string;
  buffer: Buffer;
};

// Generate upload signature for secure uploads
function generateUploadSignature(publicId: string, timestamp: number): string {
  const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`;
  return crypto
    .createHash('sha1')
    .update(paramsToSign + apiSecret)
    .digest('hex');
}

// Generate secure upload parameters
export function generateSecureUploadParams(filename: string): {
  timestamp: number;
  signature: string;
  public_id: string;
  folder: string;
  api_key: string;
} {
  const timestamp = Math.round(Date.now() / 1000);
  const public_id = `${timestamp}_${filename.split('.')[0]}`;
  const signature = generateUploadSignature(public_id, timestamp);
  
  return {
    timestamp,
    signature,
    public_id,
    folder,
    api_key: apiKey!
  };
}

export async function cloudinaryUpload(files: CloudinaryFile | CloudinaryFile[], userId?: string): Promise<UploadApiResponse | UploadApiResponse[]> {
  // Handle single file upload
  if (!Array.isArray(files)) {
    const uploadParams = generateSecureUploadParams(files.originalname);
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id: uploadParams.public_id,
          folder: uploadParams.folder,
          signature: uploadParams.signature,
          timestamp: uploadParams.timestamp,
          // Add user context for tracking
          context: userId ? `user_id=${userId}` : undefined,
          // Disable unsigned uploads
          invalidate: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!);
          }
        }
      ).end(files.buffer);
    });
  }

  // Handle multiple file upload
  const uploadPromises = files.map(file => {
    const uploadParams = generateSecureUploadParams(file.originalname);
    
    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id: uploadParams.public_id,
          folder: uploadParams.folder,
          signature: uploadParams.signature,
          timestamp: uploadParams.timestamp,
          context: userId ? `user_id=${userId}` : undefined,
          invalidate: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!);
          }
        }
      ).end(file.buffer);
    });
  });

  return await Promise.all(uploadPromises);
}

export async function cloudinaryDelete(publicIds: string | string[]): Promise<any> {
  // Handle single file deletion
  if (!Array.isArray(publicIds)) {
    return await cloudinary.uploader.destroy(`${folder}/${publicIds}`);
  }

  // Handle multiple file deletion
  const deletePromises = publicIds.map(publicId =>
    cloudinary.uploader.destroy(`${folder}/${publicId}`)
  );

  return await Promise.all(deletePromises);
}

// Utility function to generate Cloudinary URLs with transformations
export function getCloudinaryUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
}): string {
  const { width, height, crop = 'fill', quality = 'auto' } = options || {};

  const transformations: any = {
    quality,
  };

  if (width) transformations.width = width;
  if (height) transformations.height = height;
  if (width && height) transformations.crop = crop;

  return cloudinary.url(`${folder}/${publicId}`, transformations);
}