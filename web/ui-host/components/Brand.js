import { useRouter } from "next/router";

import styles from "../styles/modules/Brand.module.scss";

export default function Brand() {
  const router = useRouter();

  return (
    <button
      id={styles.brand}
      onClick={() => {
        console.log("click");
        router.push("/");
      }}
    >
      <i id={styles.brand_icon} className="fa fa-server"></i> MCW
    </button>
  );
}
