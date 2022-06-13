import { getPosts } from "../services/blog-utils";
import styles from "../styles/modules/Latest.module.scss";

export default function Latest({ posts }) {
  return (
    <div id={styles.latest}>
      <h2 className="text-green">Latest Posts</h2>
      {posts.map((post, index) => {
        <>{JSON.stringify(post)}</>;
      })}
    </div>
  );
}

export const getStaticProps = () => {
  const posts = getPosts(1);

  return {
    props: {
      posts,
    },
  };
};
