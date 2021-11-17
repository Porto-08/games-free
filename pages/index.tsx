import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import gamesIllustration from "../assets/svg/games.svg";
import Card from "../components/Card";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Games Free</title>
        <meta
          name="description"
          content="Aqui você encontrará informações sobre jogos gratuitos!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.intro}>
        <div className={styles.search}>
          <div>
            <h1>Games Free</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis obcaecati blanditiis beatae.
            </p>
          </div>

          <input type="search" name="search" />
        </div>

        <div className={styles.illustration}>
          <Image src={gamesIllustration} height={500} width={500} />
        </div>
      </section>

      <section className={styles.content}>
        <h2>Populares</h2>

        <section className={styles.cards}>
          <Card
            thumbnail="https://www.freetogame.com/g/1/thumbnail.jpg"
            id={1}
            short_description="A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
          />
          <Card
            thumbnail="https://www.freetogame.com/g/2/thumbnail.jpg"
            id={1}
            short_description="If you like blowing up tanks, with a quick and intense game style you will love this game!"
          />
          <Card
            thumbnail="https://www.freetogame.com/g/1/thumbnail.jpg"
            id={1}
            short_description="A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
          />
          <Card
            thumbnail="https://www.freetogame.com/g/1/thumbnail.jpg"
            id={1}
            short_description="A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
          />
          <Card
            thumbnail="https://www.freetogame.com/g/1/thumbnail.jpg"
            id={1}
            short_description="A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
          />
        </section>
      </section>
    </div>
  );
};

export default Home;
