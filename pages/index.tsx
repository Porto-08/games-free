import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
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

const Home = ({
  release,
  relevance,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1335 },
      items: 6.5,
      partialVisibilityGutter: 40,
    },
    SmallDesktop: {
      breakpoint: { max: 1336, min: 1025 },
      items: 4.5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 999 },
      items: 4.5,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 998, min: 0 },
      items: 2.5,
      partialVisibilityGutter: 40,
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Games Free</title>
        <meta
          name="description"
          content="Here do you find informations about free games. Just download and play!"
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

          <input
            type="search"
            name="search"
            placeholder="Search about game or category"
          />
        </div>

        <div className={styles.illustration}>
          <Image src={gamesIllustration} height={500} width={500} />
        </div>
      </section>

      <section className={styles.content}>
        <h2>Popular</h2>

        <Carousel
          responsive={responsive}
          draggable={true}
          itemClass={styles.card}
          containerClass={styles.carousel}
          swipeable={true}
          arrows={false}
          partialVisible={true}
          ssr={true}
        >
          {relevance.map((item: ICardsFetch) => {
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

        <h2>Recents</h2>

        <Carousel
          responsive={responsive}
          draggable={true}
          itemClass={styles.card}
          containerClass={styles.carousel}
          swipeable={true}
          arrows={false}
          partialVisible={true}
          ssr={true}
        >
          {release.map((item: ICardsFetch) => {
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

  if (!relevance.data || !release.data) {
    return {
      notFound: true,
      redirect: "/error",
    };
  }

  return {
    props: {
      relevance: relevance.data,
      release: release.data,
    },
    revalidate: 10,
  };
};

export default Home;
