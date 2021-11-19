import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "./styles.module.scss";
import { ICardsFetch, IGame } from "../../interfaces/index";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IGameProps {
  game: IGame;
}

const game = ({ game }: IGameProps) => {
  const randomNumber = Math.round(Math.random() * 2);
  const randomNumberThumb = Math.round(Math.random() * 2);


  function formatedDate(date) {
    const newDate = new Date(date.replace(/\s/, "T"));

    const dateFormated = `${newDate.getFullYear()}/${newDate.getDate() + 1}/${newDate.getMonth() + 1}`;

    return dateFormated;
  }

  return (
    <div
      style={{ background: `url(${game.screenshots[randomNumber].image})` }}
      className={styles.container}
    >
      <section className={styles.content}>
        <Image
          height={300}
          width={1200}
          src={game.screenshots[randomNumberThumb].image}
          objectFit="cover"
          loading="eager"
          alt="Game thumbnail"
        />

        <div className={styles.contentText}>
          <section className={styles.introduction}>
            <div>
              <h1>{game.title} - </h1>
              <a href={game.game_url} target="_blank" rel="noreferrer">
                Visit Game
              </a>
            </div>

            <div>
              <div>
                <span>{game.genre}</span>
                <span>{formatedDate(game.release_date)}</span>
              </div>

              <div>
                <span>{game.developer}</span>
              </div>
            </div>

            <p>{game.description}</p>
          </section>

          <section className={styles.requirements}>
            <section>
              <h2>Os</h2>
              <span>{game.minimum_system_requirements.os}</span>

              <h2>Memory</h2>
              <span>{game.minimum_system_requirements.memory}</span>

              <h2>Storage</h2>
              <span>{game.minimum_system_requirements.storage}</span>
            </section>

            <section>
              <h2>Processor</h2>
              <span>{game.minimum_system_requirements.processor}</span>

              <h2>Graphics</h2>
              <span>{game.minimum_system_requirements.memory}</span>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("https://www.freetogame.com/api/games");

  const paths = data.map((game: ICardsFetch) => {
    return {
      params: {
        id: game.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
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
