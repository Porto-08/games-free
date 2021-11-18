import styles from "./styles.module.scss";
import Image from "next/image";
import { AiFillPlusCircle, AiFillChrome, AiFillWindows } from "react-icons/ai";
interface ICard {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const Card = ({
  thumbnail,
  id,
  short_description,
  title,
  genre,
  platform,
}: ICard) => {

  return (
    <div className={styles.card}>
      <Image
        src={thumbnail}
        alt="Game Thumbnail"
        width={225}
        height={206}
        layout="fixed"
        objectFit="fill"
        draggable={false}
        title={title}
      />

      <section className={styles.cardDescription}>
        <h4 title={title}>{title}</h4>
        <p title="Description">{short_description}</p>

        <div className={styles.icons}>
          <AiFillPlusCircle className={styles.icon} title="See about the game"/>


          <div>
            {platform == "PC (Windows)" ? (
              <AiFillWindows className={styles.icon} title="Plataform"/>
            ) : (
              <AiFillChrome className={styles.icon} title="Plataform"/>
            )}

            <span title="Genre">{genre}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
