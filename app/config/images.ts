import { ImageUrls } from '../types/images';
import { BASE_URL } from './constants';

export const SITE_IMAGES: ImageUrls[] = [
  {
    path: '/page2/images/06207f65694be544fc50d5d13927c51b.webp',
    widths: [575, 767, 991, 1199]
  },
  {
    path: '/page2/images/68abc6e67360d73e446aed2bebae31e1.webp',
    widths: [575, 767, 991, 1199]
  },
  {
    path: '/page2/images/86430c1e47bc1f6d82f30d464d996f05.webp',
    widths: [575, 767, 991, 1199]
  },
  {
    path: '/page2/images/1085b5821a354b3c65fbc35b013ac9ae.webp',
    widths: [575, 767, 991, 1199]
  },
  {
    path: '/page2/images/737ef4541d069cb9b78cecb2c3096a0f.webp',
    widths: [575, 767, 991, 1199]
  },
  {
    path: '/page2/images/5d416f45996c730deac3f4aeef07479d.webp',
    widths: [575, 767, 991, 1199]
  },
  // ... другие изображения
];

export function getImageUrl(path: string, width?: number): string {
  // Убираем слэш в конце BASE_URL если есть и добавляем слэш в начало пути если нет
  const baseUrlClean = BASE_URL.replace(/\/+$/, '');
  const pathClean = path.startsWith('/') ? path : `/${path}`;
  
  console.log('getImageUrl:', {
    BASE_URL,
    input: path,
    baseUrl: baseUrlClean,
    pathClean,
    result: `${baseUrlClean}${pathClean}${width ? `?width=${width}` : ''}`
  });

  return `${baseUrlClean}${pathClean}${width ? `?width=${width}` : ''}`;
}

export function getImageSrcSet(image: ImageUrls): string {
  return image.widths
    .map(width => `${getImageUrl(image.path, width)} ${width}w`)
    .join(',\n');
} 