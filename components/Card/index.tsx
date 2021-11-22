import styles from "./styles.module.scss";
import Image from "next/image";
import { AiFillPlusCircle, AiFillChrome, AiFillWindows } from "react-icons/ai";
import { useRouter } from "next/dist/client/router";
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
  filter: (form: string) => void;
}

const Card = ({
  thumbnail,
  id,
  short_description,
  title,
  genre,
  platform,
  filter,
}: ICard) => {

  const router = useRouter()

  return (
    <div className={`${styles.card} animate__animated animate__fadeIn`} onClick={screen.width < 900 ? () => router.push(`/game/${id}`) : null}>
      <img
        src={thumbnail}
        alt="Game Thumbnail"
        draggable={false}
        title={title}
      />

      <section className={styles.cardDescription}>
        <h4 title={title}>{title}</h4>
        <p title="Description">{short_description}</p>

        <div className={styles.icons}>
          <AiFillPlusCircle className={styles.icon} title="See about the game" onClick={() => router.push(`/game/${id}`)}/>


          <div>
            {platform == "PC (Windows)" ? (
              <AiFillWindows className={styles.icon} title="Plataform" onClick={() => filter("PC (Windows)")}/>
            ) : (
              <AiFillChrome className={styles.icon} title="Plataform" onClick={() => filter("Web Browser")}/>
            )}

            <span title="Genre" onClick={() => filter(genre)} >{genre}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
