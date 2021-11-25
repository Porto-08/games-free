import styles from "./404.module.scss";
import notFound from "../assets/svg/not_found.svg";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1>
        Sorry, this page not exist. <Link href="/">Go back to home.</Link>
      </h1>

      <Image src={notFound} width="500" height="500" alt="Error 404" />
    </div>
  );
};

export default Custom404;
