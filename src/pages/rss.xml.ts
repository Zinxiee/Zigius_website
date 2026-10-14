import { getRssString } from '@astrojs/rss';
import type { APIContext } from 'astro';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';
import { getCollection } from 'astro:content';

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
        title: post.title,
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
