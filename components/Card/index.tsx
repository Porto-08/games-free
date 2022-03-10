import styles from "./styles.module.scss";
import Image from "next/image";
import { AiFillPlusCircle, AiFillChrome, AiFillWindows } from "react-icons/ai";
import { useRouter } from "next/dist/client/router";
import { ICard } from "interfaces";
const Card = ({
  thumbnail,
  id,
  short_description,
  title,
  genre,
  platform,
  filter,
}: ICard) => {
  const router = useRouter();

  return (
    <div
      className={`${styles.card} fadeInUp`}
    >
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
          <AiFillPlusCircle
            className={styles.icon}
            title="See about the game"
            onClick={() => router.push(`/game/${id}`)}
            role="figure"
          />

          <div>
            {platform === "PC (Windows)" ? (
              <AiFillWindows
                className={styles.icon}
                title="Plataform"
                onClick={() => filter("PC (Windows)")}
                role="figure"
              />
            ) : (
              <AiFillChrome
                className={styles.icon}
                title="Plataform"
                onClick={() => filter("Web Browser")}
                role="figure"
              />
            )}

            <span title="Genre" role="button" onClick={() => filter(genre)}>
              {genre}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
