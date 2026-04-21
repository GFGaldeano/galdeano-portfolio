// src/lib/blog.js
export const BLOG_MEDIA_TYPES = ['image', 'pdf', 'video'];

export function createSlug(text = '') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function isValidMediaType(type) {
  return BLOG_MEDIA_TYPES.includes(type);
}