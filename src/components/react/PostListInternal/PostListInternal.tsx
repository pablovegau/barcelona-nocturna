import { Button } from '@/components/react/Button/Button';
import PostCard, { type PostData } from '@/components/react/PostCard/PostCard';
import { useState } from 'react';
import styles from './styles.module.css';

interface Props {
  initialData: {
    posts: PostData[];
    totalPages: number;
  };
}

export function PostListInternal({ initialData }: Props) {
  const [posts, setPosts] = useState(initialData.posts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const hasMore = page <= initialData.totalPages;

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/posts/page/${page}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: { items: PostData[] } = await res.json();

      setPosts((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('❌ Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>

      {hasMore && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button
            icon="arrow-down"
            onClick={loadMore}
            disabled={loading}
            aria-busy={loading}
          >
            Cargar escenas antiguas
          </Button>
        </div>
      )}
    </div>
  );
}
