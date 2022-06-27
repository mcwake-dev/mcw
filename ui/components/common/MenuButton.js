import { useAtom } from "jotai";
import isMenuOpenAtom from "../../atoms/menu-open.atom";

export default function MenuButton({ id }) {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  const toggleMenu = (_ev) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <button
      id={id}
      className="menu-button"
      aria-haspopup="true"
      aria-controls="menu"
      aria-expanded={isMenuOpen}
      onClick={toggleMenu}
    >
      <i className="fa fa-bars"></i>
    </button>
  );
}
