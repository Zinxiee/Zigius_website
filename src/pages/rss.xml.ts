import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';
import { getCollection } from 'astro:content';

export const GET = async () => {
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
    
    return {
      title: post.title,
      description: post.excerpt,
      content: rawFile?.body,
      pubDate: post.publishDate,
      link: getPermalink(post.permalink, 'post'),
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
