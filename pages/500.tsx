import styles from "./404.module.scss";
import notFound from "../assets/svg/not_found.svg";
import Image from "next/image" 
import Link from "next/link" 

const Custom500 = () => {
  return (
    <div className={styles.container}>
      <h1>Sorry, this page not exist or we have a internal server error. <Link href="/" >Go back to home.</Link></h1>
      <Image
        src={notFound}
        height={500}
        width={500}
        alt="Not Found"
      />
    </div>
  );
};

export default Custom500;
