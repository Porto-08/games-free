import styles from "./styles.module.scss";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.navBar}>
        <li>
          <Link href="/shooter">Shooter</Link>
        </li>
        <li>
          <Link href="/mmo">MMO</Link>
        </li>
        <li>
          <Link href="/strategy">RPG</Link>
        </li>
        <li>
          <Link href="/strategy">Strategy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
