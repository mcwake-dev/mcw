import Heading from "../common/Heading";

export default function GithubSquare({ commits }) {
  return (
    <div>
      <section>
        <Heading icon="fa-github" text1="github" text2="commits" />
        {commits.map((commit, index) => {
          const commitDate = new Date(commit.pubDate);

          return (
            <a href={commit.link} key={commit.link}>
              <article>
                <span>
                  <span>[{commitDate.toLocaleDateString()}]</span>
                  <span> [{commitDate.toLocaleTimeString()}]</span>
                  {commit.title.length > 50 ? " " + commit.title : commit.title}
                </span>
              </article>
            </a>
          );
        })}
      </section>
    </div>
  );
}
