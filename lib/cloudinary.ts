import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Support both CLOUDNARY_* and CLOUDINARY_* environment variable naming
const cloudName = process.env.CLOUDNARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDNARY_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDNARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;

/**
 * Uploads an image buffer or base64 to Cloudinary with compression and auto-format (WebP/AVIF).
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  folder = 'evstay/stations'
): Promise<UploadApiResponse> {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials are not configured in environment variables.');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
          { width: 1600, crop: 'limit' }, // limits max dimension to 1600px without upscaling
        ],
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload returned empty response'));
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}
