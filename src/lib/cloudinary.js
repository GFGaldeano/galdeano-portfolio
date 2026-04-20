// src/lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function getCloudinaryResourceType(mediaType) {
  switch (mediaType) {
    case 'video':
      return 'video';
    case 'pdf':
      return 'image';
    case 'image':
    default:
      return 'image';
  }
}

export async function uploadToCloudinary(fileBuffer, options = {}) {
  const {
    folder = 'galdeano-portfolio/blog',
    mediaType = 'image',
    publicId,
    originalFilename,
  } = options;

  const resourceType = getCloudinaryResourceType(mediaType);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: resourceType,
        use_filename: !publicId,
        unique_filename: !publicId,
        overwrite: false,
        filename_override: originalFilename,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId, mediaType = 'image') {
  const resourceType = getCloudinaryResourceType(mediaType);

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}