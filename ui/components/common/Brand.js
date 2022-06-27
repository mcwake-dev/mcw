import Link from "next/link";

export default function Brand({ text1, text2 }) {
  return (
    <Link href="/">
      <a className="brand">
        <span className="dim">{text1}</span>
        <span className="bright">{text2}</span>
      </a>
    </Link>
  );
}
