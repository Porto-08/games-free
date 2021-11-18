import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import gamesIllustration from "../assets/svg/games.svg";
import Card from "../components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { ICardsFetch } from "../interfaces";
import SearchCarousel from "../components/SearchCarousel";
import { ImRocket } from "react-icons/im";
interface IHomeProps {
  release: ICardsFetch[];
  relevance: ICardsFetch[];
}

interface ISearch {
  search: string | undefined;
}

const Home = ({ release, relevance }: IHomeProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1335 },
      items: 6.7,
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

  const [form, setForm] = useState<string>();
  const [error, setError] = useState<string>();
  const [search, setSearch] = useState<ICardsFetch[]>();
  const [lastSearch, setLastSearch] = useState<string>();
  const [genres, setGenres] = useState<string[]>([]);

  const filterGames = (event:any) => {
    event.preventDefault();

    if (!form) setError("Please enter a search term");

    if (form) {
      const title = release.filter((item: ICardsFetch) => {
        return item.title.toLowerCase().includes(form.toLowerCase());
      });

      if (title.length > 0) return setSearch(title);

      const category = release.filter((item: ICardsFetch) => {
        return item.genre.toLowerCase().includes(form.toLowerCase());
      });

      if (category.length > 0) return setSearch(category);

      setError(`Not results found for ${form}`);
    }
  };


  
  const getGenres = () => {
    const arrayGenres: string[] = [];

    release.forEach((item: ICardsFetch) => {
      item.genre
        .replace(" ", "")
        .split(",")
        .map((genre: string) => {
          if (!arrayGenres.includes(genre)) {
            arrayGenres.push(genre);
          }
        });
    });

    setGenres(arrayGenres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    setLastSearch(form);
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Games Free</title>
        <meta name="description" content="Informations about free games." />
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

          <form onSubmit={filterGames} className={styles.searchBox}>
            <input
              type="text"
              name="search"
              placeholder="Search about game or category"
              onChange={(e) => setForm(e.target.value)}
              id="search"
              list="genres"
            
            />
            <datalist id="genres">
              {genres.map((genre, index) => {
                return <option key={index} value={genre} />;
              })}
            </datalist>

            <button type="submit">
              <ImRocket />
            </button>
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.illustration}>
          <Image src={gamesIllustration} height={500} width={500} />
        </div>
      </section>

      {search && search.length > 0 && (
        <section className={styles.searchContent}>
          <h2>Search result for: {lastSearch}.</h2>
          <SearchCarousel data={search} />
        </section>
      )}

      <section className={styles.content}>
        <h2>Popular</h2>

        <SearchCarousel data={relevance} />

        <h2>Recents</h2>

        <SearchCarousel data={release} />
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
