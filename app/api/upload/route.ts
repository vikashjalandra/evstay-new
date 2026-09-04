import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary supporting both naming conventions
const cloud_name = process.env.CLOUDNARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDNARY_API_KEY || process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDNARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file received' },
        { status: 400 }
      );
    }

    // Convert file arrayBuffer to base64 Data URI (bulletproof in all runtimes)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary with auto-compression & WebP auto-format
    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: 'evstay/stations',
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { width: 1600, crop: 'limit' },
      ],
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: any) {
    console.error('Cloudinary API upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Cloudinary upload error',
      },
      { status: 500 }
    );
  }
}
