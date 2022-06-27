import Link from "next/link";

export default function Post({ backgroundImage, title, author, children }) {
  return (
    <article>
      <main>
        <header>
          <div>
            <h2>{title}</h2>
            <h3>By {author}</h3>
          </div>
        </header>
        {children}
        <footer>
          <Link href="/blog/latest">Back</Link>
        </footer>
      </main>
    </article>
  );
}
