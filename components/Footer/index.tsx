import styles from "./styles.module.scss";
import { BsFillSuitHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <span>
        &copy; {new Date().getFullYear()} Todos os direitos Reservados. <br />
         Feito com <BsFillSuitHeartFill /> por{" "} 
        <a href="https://www.github.com/Porto-08" target="_blank" rel="noreferrer">
          Samuel Porto
        </a>
      </span>
    </footer>
  );
};

export default Footer;
