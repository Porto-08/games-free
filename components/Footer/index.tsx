import styles from "./styles.module.scss";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BiArrowFromBottom } from "react-icons/bi";

const Footer = () => {

  return (
    <footer className={styles.container}>
      <span>
        &copy; {new Date().getFullYear()} Todos os direitos Reservados. <br />
         Feito com <BsFillSuitHeartFill role="figure" /> por{" "} 
        <a href="https://portfolio-nine-rose-40.vercel.app/" target="_blank" rel="noreferrer">
          Samuel Porto
        </a>
      </span>

      <BiArrowFromBottom role="button" className={styles.scrollTop} onClick={() => window.scrollTo(0, 0)}/>
    </footer>
  );
};

export default Footer;
