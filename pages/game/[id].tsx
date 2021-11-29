import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "./styles.module.scss";
import { ICardsFetch, IGame } from "../../interfaces/index";
import Head from "next/head";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";
import {FiExternalLink} from "react-icons/fi"

interface IGameProps {
  game: IGame;
  similarGames: ICardsFetch[];
}

interface IRandomNumber {
  background: number;
  header: number;
}

const Game = ({ game, similarGames }: IGameProps) => {
  const [randomNumber, setRandomNumber] = useState<IRandomNumber>({
    background: 0,
    header: 1,
  });
  const router = useRouter();

  function formatedDate(date) {
    const newDate = new Date(date.replace(/\s/, "T"));

    const dateFormated = `${newDate.getFullYear()}/${newDate.getDate() + 1}/${
      newDate.getMonth() + 1
    }`;

    return dateFormated;
  }

  return (
    <div style={{height: "100vh"}}>
      <Head>
        <title>
          {game.title} | {game.genre}
        </title>
      </Head>

      <div
        style={{
          background: `url(${
            game.screenshots[randomNumber.background].image
          }) `,
          backgroundSize: "100%",
          objectFit: "cover",
        }}
        className={`${styles.container} animate__animated animate__fadeIn`}
      >
        <Link href="/">
          <span className={styles.backToHome}>
            <BiArrowBack />
          </span>
        </Link>

        <section className={styles.content}>
          <img
            src={game.screenshots[randomNumber.header].image}
            alt="Game thumbnail"
          />

          <div className={styles.contentText}>
            <section className={styles.introduction}>
              <div>
                <h1>{game.title || "Title Game"} - </h1>
                <a href={game.game_url || "#"} target="_blank" rel="noreferrer">
                  Download <FiExternalLink />
                </a>
              </div>

              <div>
                <div>
                  <span>{game.genre || "Genre"}</span>
                  <span>
                    {formatedDate(game.release_date) || "release_date"}
                  </span>
                </div>

                <div>
                  <span>{game.developer || "Developer"}</span>
                </div>
              </div>

              <p>{game.description || "Description"}</p>
            </section>

            <section className={styles.requirements}>
              <section>
                <h2>Os</h2>
                <span>{game.minimum_system_requirements.os || "Windows"}</span>

                <h2>Memory</h2>
                <span>
                  {game.minimum_system_requirements.memory || "Memory Ram"}
                </span>

                <h2>Storage</h2>
                <span>
                  {game.minimum_system_requirements.storage || "Storage"}
                </span>
              </section>

              <section>
                <h2>Processor</h2>
                <span>
                  {game.minimum_system_requirements.processor || "Processor"}
                </span>

                <h2>Graphics</h2>
                <span>
                  {game.minimum_system_requirements.graphics || "Graphics"}
                </span>
              </section>
            </section>

            <section className={styles.recommended}>
              <h2>Recommended</h2>

              <div>
                {similarGames.map((game: ICardsFetch) => {
                  return (
                    <div
                      key={game.id}
                      style={{
                        background: `url(${game.thumbnail}) no-repeat center center`,
                        backgroundSize: "cover",
                      }}
                      className={styles.game}
                      onClick={() => router.push(`/game/${game.id}`)}
                    >
                      <h4>{game.title}</h4>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: {
        id: "1",
      },
    },
    {
      params: {
        id: "2",
      },
    },
    {
      params: {
        id: "3",
      },
    },
    {
      params: {
        id: "4",
      },
    },
    {
      params: {
        id: "5",
      },
    },
    {
      params: {
        id: "6",
      },
    },
    {
      params: {
        id: "7",
      },
    },
    {
      params: {
        id: "8",
      },
    },
    {
      params: {
        id: "9",
      },
    },
    {
      params: {
        id: "10",
      },
    },
  ];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;

  const { data } = await axios.get<IGame>(
    `https://www.freetogame.com/api/game?id=${id}`
  );

  const similarGames = await axios.get<ICardsFetch[]>(
    `https://www.freetogame.com/api/games`
  );

  const removeSameGame = similarGames.data.filter((game) => {
    return game.id !== data.id && game.genre === data.genre;
  });

  return {
    props: {
      game: data,
      similarGames: removeSameGame.splice(
        Math.round(Math.random() * removeSameGame.length),
        3
      ),
    },
  };
};

export default Game;
