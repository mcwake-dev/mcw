import Link from "next/link";

export default function MenuItem({ href, title }) {
  return (
    <li role="none">
      <Link href={href}>
        <a className="menu-item" role="menuitem">
          {title}
        </a>
      </Link>
    </li>
  );
}
