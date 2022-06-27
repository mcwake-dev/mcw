export default function PostReference({ title, href }) {
  return (
    <cite>
      <a href={href}>{title}</a>
    </cite>
  );
}
