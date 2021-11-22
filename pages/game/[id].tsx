import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "./styles.module.scss";
import { ICardsFetch, IGame } from "../../interfaces/index";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";

interface IGameProps {
  game: IGame;
}

interface IRandomNumber {
  background: number;
  header: number;
}

const game = ({ game }: IGameProps) => {
  const [randomNumber, setRandomNumber] = useState<IRandomNumber>({
    background: Math.round(Math.random() * 2),
    header: Math.round(Math.random() * 2),
  });


  function formatedDate(date) {
    const newDate = new Date(date.replace(/\s/, "T"));

    const dateFormated = `${newDate.getFullYear()}/${newDate.getDate() + 1}/${
      newDate.getMonth() + 1
    }`;

    return dateFormated;
  }

  return (
    <>
      <Head>
        <title>
          {game.title} | {game.genre}
        </title>
      </Head>

      <div
        style={{
          background: `url(${game.screenshots[randomNumber.background].image}) no-repeat center center`,
        }}
        className={`${styles.container} animate__animated animate__fadeIn`}
      >
        <Link href="/">
          <span className={styles.backToHome}>
            <BiArrowBack />
          </span>
        </Link>

        <section className={styles.content}>
          <Image
            height={300}
            width={1200}
            src={
              game.screenshots[randomNumber.header].image 
            }
            objectFit="cover"
            // loading="eager"
            alt="Game thumbnail"
          />

          <div className={styles.contentText}>
            <section className={styles.introduction}>
              <div>
                <h1>{game.title || "Title Game"} - </h1>
                <a href={game.game_url || "#"} target="_blank" rel="noreferrer">
                  Visit Game
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
          </div>
        </section>
      </div>
    </>
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

  const { data } = await axios.get(
    `https://www.freetogame.com/api/game?id=${id}`
  );

  return {
    props: {
      game: data,
    },
  };
};

export default game;
