import Link from "next/link";
import { useAtom } from "jotai";

import isMenuOpenAtom from "../../atoms/menu-open.atom";
import Brand from "../../components/common/Brand";
import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";

export default function Menu() {
  const [isMenuOpen] = useAtom(isMenuOpenAtom);
  const menuButtonId = "menu-button";

  return (
    <nav className="menu">
      <Brand text1="mcw" text2="portfolio" />
      <MenuButton id={menuButtonId} />
      {isMenuOpen && (
        <ul id="menu" role="menu" aria-labelledby={menuButtonId}>
          <MenuItem href="/" title="Home" />
          <MenuItem href="/about" title="About" />
          <MenuItem href="/blog" title="Blog" />
          <MenuItem href="/projects" title="Projects" />
        </ul>
      )}
    </nav>
  );
}
