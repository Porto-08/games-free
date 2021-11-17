import styles from "./styles.module.scss";
import Image from "next/image";

interface ICard {
  thumbnail: string;
  id: number;
  short_description: string;
}

const Card = ({ thumbnail, id, short_description }: ICard) => {
  return (
    <div className={styles.card}>
      <Image src={thumbnail} alt="Game Thumbnail" width={250} height={206} />

      <p>{short_description}</p>
    </div>
  );
};

export default Card;
