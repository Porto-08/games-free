import styles from "./404.module.scss";
import notFound from "../assets/svg/not_found.svg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1217949519178812"
          crossOrigin="anonymous"
        ></script>
      </Head>
      
      <h1>
        Sorry, this page not exist. <Link href="/">Go back to home.</Link>
      </h1>

      <Image src={notFound} width="500" height="500" alt="Error 404" />
    </div>
  );
};

export default Custom404;
