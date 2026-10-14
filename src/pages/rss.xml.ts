import { getRssString } from '@astrojs/rss';
import type { APIContext } from 'astro';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';
import { getCollection } from 'astro:content';

// Converts standard letters and digits into Unicode Sans-Serif Bold equivalents
function toUnicodeBold(text: string): string {
  if (!text) return '';
  return text.replace(/[A-Za-z0-9]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(code - 65 + 0x1D5D4); // Uppercase (A-Z)
    if (code >= 97 && code <= 122) return String.fromCodePoint(code - 97 + 0x1D5EE); // Lowercase (a-z)
    if (code >= 48 && code <= 57) return String.fromCodePoint(code - 48 + 0x1D7EC); // Numbers (0-9)
    return char;
  });
}

export const GET = async ({ site }: APIContext) => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();
  const rawPosts = await getCollection('post');

  const rss = await getRssString({
    title: `${SITE.name}'s Blog`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,

    items: posts.map((post) => {
      const rawFile = rawPosts.find((p) => p.id === post.id);
      const imageUrl =
        typeof post.image === 'string' && (site || import.meta.env.SITE)
          ? new URL(post.image, site || import.meta.env.SITE).toString()
          : '';

      return {
        // Bolds the title in the feed
        title: toUnicodeBold(post.title || ''),
        // Kept plain so the Make.com "Summary" variable remains unbolded
        description: post.excerpt,
        content: rawFile?.body,
        pubDate: post.publishDate,
        link: getPermalink(post.permalink, 'post'),
        enclosure: imageUrl
          ? {
              url: imageUrl,
              type: 'image/jpeg',
              length: 65535,
            }
          : undefined,
      };
    }),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};