// src/app/api/blog/upload/route.ts
import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { cloudinary, uploadToCloudinary } from '../../../../lib/cloudinary';
import { isValidMediaType } from '../../../../lib/blog';

function isAllowedFileType(mediaType: string, mimeType: string) {
  if (mediaType === 'image') return mimeType.startsWith('image/');
  if (mediaType === 'video') return mimeType.startsWith('video/');
  if (mediaType === 'pdf') return mimeType === 'application/pdf';
  return false;
}

function buildThumbnailUrl(publicId: string, mediaType: string) {
  if (mediaType === 'image') return null;

  if (mediaType === 'pdf') {
    return cloudinary.url(publicId, {
      resource_type: 'image',
      format: 'jpg',
      page: 1,
      secure: true,
    });
  }

  if (mediaType === 'video') {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      format: 'jpg',
      secure: true,
    });
  }

  return null;
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const mediaType = String(formData.get('mediaType') || '').trim();

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'Debes seleccionar un archivo' },
        { status: 400 }
      );
    }

    if (!isValidMediaType(mediaType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Usa image, pdf o video' },
        { status: 400 }
      );
    }

    if (!isAllowedFileType(mediaType, file.type)) {
      return NextResponse.json(
        { error: 'El archivo no coincide con el tipo seleccionado' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await uploadToCloudinary(buffer, {
      folder: 'galdeano-portfolio/blog',
      mediaType,
      originalFilename: file.name,
    });

    const thumbnailUrl =
      mediaType === 'image'
        ? result.secure_url
        : buildThumbnailUrl(result.public_id, mediaType);

    return NextResponse.json(
      {
        success: true,
        asset: {
          media_type: mediaType,
          media_url: result.secure_url,
          media_public_id: result.public_id,
          media_resource_type: result.resource_type,
          thumbnail_url: thumbnailUrl,
          original_filename: file.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en upload blog:', error);
    return NextResponse.json(
      { error: 'Error subiendo archivo multimedia' },
      { status: 500 }
    );
  }
}