import AboutSquare from "../components/index/AboutSquare";
import AuthenticationSquare from "../components/index/AuthenticationSquare";

import BlogSquare from "../components/index/BlogSquare";
import GithubSquare from "../components/index/GithubSquare";
import ProjectSquare from "../components/index/ProjectSquare";

import { getPosts } from "../services/blog.service";
import { getGithubFeed } from "../services/github-rss.service";
import { getProjects } from "../services/project.service";

export default function Home({ posts, commits, projects }) {
  return (
    <div>
      <section>
        <AboutSquare />
      </section>
      <section>
        <AuthenticationSquare />
      </section>
      <section>
        <GithubSquare commits={commits} />
      </section>
      <section>
        <ProjectSquare projects={projects} />
      </section>
      <section>
        <BlogSquare posts={posts} />
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getPosts(1);
  const commits = await getGithubFeed();
  const projects = getProjects();

  return {
    props: {
      posts,
      commits,
      projects,
    },
  };
}
