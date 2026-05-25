import type { APIContext } from 'astro';
import { generateOgImage } from '@/lib/og-image';

export async function GET(_context: APIContext) {
  const png = await generateOgImage(
    'ankitranjan.dev',
    'Flutter & Mobile Development Blog'
  );

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
