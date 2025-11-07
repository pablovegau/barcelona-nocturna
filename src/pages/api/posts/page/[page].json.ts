import { PAGE_SIZE } from '@/constants';
import { getPaginatedPosts, getPublishedPosts } from '@/domain/posts';
import type { APIRoute, GetStaticPaths } from 'astro';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const all = await getPublishedPosts();
  const totalPages = Math.ceil(all.length / PAGE_SIZE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    params: { page: String(i + 2) },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const pageNum = Number(params.page ?? '2');
  if (!Number.isFinite(pageNum) || pageNum < 2) {
    return new Response(JSON.stringify({ items: [] }), { status: 400 });
  }

  const { posts } = await getPaginatedPosts(pageNum, PAGE_SIZE);

  const items = posts.map((p) => ({
    id: p.id,
    data: {
      title: p.data.title,
      abstract: p.data.abstract,
      publishDate: p.data.publishDate,
      sessionDate: p.data.sessionDate,
      tags: p.data.tags,
      isDraft: p.data.isDraft,
    },
  }));

  return new Response(JSON.stringify({ items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
