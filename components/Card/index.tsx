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


  console.log(platform);
  

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
        <h4 title="Nome">{title}</h4>
        <p title="Descrição">{short_description}</p>

        <div className={styles.icons}>
          <AiFillPlusCircle className={styles.icon} title="Ver jogo"/>


          <div>
            {platform == "PC (Windows)" ? (
              <AiFillWindows className={styles.icon} title="Plataforma"/>
            ) : (
              <AiFillChrome className={styles.icon} title="Plataforma"/>
            )}

            <span title="Gênero">{genre}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
