import { getCollection } from 'astro:content';
import { PAGE_SIZE } from '@/constants';

const POSTS_COLLECTION = 'posts';

/**
 * This function returns all posts from the content collection.
 */
export async function getPosts() {
  return await getCollection(POSTS_COLLECTION);
}

/**
 * Returns all published posts sorted by session date (most recent first).
 */
export async function getPublishedPosts() {
  const posts = await getCollection(POSTS_COLLECTION, ({ data }) => {
    return !data.isDraft;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.data.sessionDate).getTime() -
      new Date(a.data.sessionDate).getTime(),
  );
}

/**
 * Returns paginated posts.
 * @param page - Page number (starting from 1)
 * @param limit - Number of posts per page
 */
export async function getPaginatedPosts(page = 1, limit = PAGE_SIZE) {
  const allPosts = await getPublishedPosts();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalCount: allPosts.length,
    hasMore: endIndex < allPosts.length,
    currentPage: page,
    nextPage: endIndex < allPosts.length ? page + 1 : null,
  };
}
