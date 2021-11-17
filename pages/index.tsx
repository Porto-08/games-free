import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import gamesIllustration from "../assets/svg/games.svg";
import Card from "../components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

interface ICardsFetch {
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

const Home = ({ release, relevance }: ICardsFetch[]) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 999 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 2,
    },
  };

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

          <input type="search" name="search" placeholder="Busque por um Jogo ou Catêgoria" />
        </div>

        <div className={styles.illustration}>
          <Image src={gamesIllustration} height={500} width={500} />
        </div>
      </section>

      <section className={styles.content}>
        <h2>Populares</h2>

        <Carousel
          responsive={responsive}
          draggable={true}
          infinite={true}
          itemClass={styles.card}
          containerClass={styles.carousel}
          // autoPlay={true}
          customTransition="all 3.5s"
          swipeable={true}
          arrows={false}
        >
          {relevance.map((item: ICardsFetch) => {
            console.log(item);
            
            return (
              <Card
                id={item.id}
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                short_description={item.short_description}
                genre={item.genre}
                developer={item.developer}
                freetogame_profile_url={item.freetogame_profile_url}
                game_url={item.game_url}
                platform={item.platform}
                publisher={item.publisher}
                release_date={item.release_date}
              />
            );
          })}
        </Carousel>

        <h2>Mais Recentes</h2>

        <Carousel
          responsive={responsive}
          draggable={true}
          infinite={true}
          itemClass={styles.card}
          containerClass={styles.carousel}
          // autoPlay={true}
          customTransition="all 3.5s"
          swipeable={true}
          arrows={false}
        >
          {release.map((item: ICardsFetch) => {
            console.log(item);
            
            return (
              <Card
                id={item.id}
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                short_description={item.short_description}
                genre={item.genre}
                developer={item.developer}
                freetogame_profile_url={item.freetogame_profile_url}
                game_url={item.game_url}
                platform={item.platform}
                publisher={item.publisher}
                release_date={item.release_date}
              />
            );
          })}
        </Carousel>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const relevance = await axios.get<ICardsFetch[]>(
    "https://www.freetogame.com/api/games?sort-by=relevance"
  );

  const release = await axios.get<ICardsFetch[]>(
    "https://www.freetogame.com/api/games?sort-by=release-date"
  );

  return {
    props: {
      relevance: relevance.data,
      release: release.data,
    },
  };
};

export default Home;
