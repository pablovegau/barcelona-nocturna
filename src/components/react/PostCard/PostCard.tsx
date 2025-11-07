import styles from './styles.module.css';

export type PostData = {
  id: string;
  data: {
    title: string;
    abstract: string;
    publishDate: string;
    sessionDate: string;
    tags: string[];
    isDraft: boolean;
  };
};

const PostCard = ({ post }: { post: PostData }) => (
  <li className={styles.postCard}>
    <h2 className="h2">
      <a className={styles.postCard__TitleLink} href={`/posts/${post.id}`}>
        {post.data.title}
      </a>
    </h2>
    <p className={styles.postCard__Abstract}>{post.data.abstract}</p>
    <a className={styles.postCard__ReadMore} href={`/posts/${post.id}`}>
      Leer más
    </a>
  </li>
);

export default PostCard;
