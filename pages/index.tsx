import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import gamesIllustration from "../assets/svg/games.svg";
import Card from "../components/Card";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { ICardsFetch } from "../interfaces";
import SearchCarousel from "../components/SearchCarousel";
import { ImRocket } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";

interface IHomeProps {
  release: ICardsFetch[];
  relevance: ICardsFetch[];
  filter: ICardsFetch[];
}

const Home = ({ release, relevance, filter }: IHomeProps) => {
  const [form, setForm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<ICardsFetch[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [category, setCategory] = useState<ICardsFetch[]>([]);
  const [informationsSearchs, setInformationsSearchs] = useState<any>();

  const filterGames = (form: string, event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    setCategory([]);

    if (form === "") {
      toast.error("Please enter a game/category name", {
        theme: "dark",
        pauseOnHover: true,
      });

      return;
    }

    if (form) {
      console.log(form);
      
      const title = filter.filter((item: ICardsFetch) => {
        return item.title.toLowerCase().includes(form.toLowerCase());
      });

      if (title.length > 0) {
        document.querySelector("#searchContainer")?.scrollIntoView();

        setError("");
        setSearch(title);
        return;
      }

      const category = filter.filter((item: ICardsFetch) => {
        return item.genre.toLowerCase().includes(form.toLowerCase());
      });

      if (category.length > 0) {
        document.querySelector("#searchContainer")?.scrollIntoView();
        setError("");
        setSearch(category);
        return;
      }

      const platform = filter.filter((item: ICardsFetch) => {
        return item.platform.toLowerCase().includes(form.toLowerCase());
      });

      if (platform.length > 0) {
        document.querySelector("#searchContainer")?.scrollIntoView();

        setError("");
        setSearch(platform);
        return;
      }

      setError(`Not results found for: "${form}". :(`);
      setSearch([]);

      window.location.href = "#searchContainer";
    }
  };

  const filterGenres = (genre: string) => {
    setInformationsSearchs({ ...informationsSearchs, genre: genre });
    setSearch([]);
    setForm("");

    const genreFilter = filter.filter((item: ICardsFetch) => {
      return item.genre.toLowerCase().includes(genre.toLowerCase());
    });

    setCategory(genreFilter);

    if (screen.width < 640 || screen.height < 480) {
      window.scrollTo(0, 200);
    } else {
      window.scrollTo(0, 500);
    }
  };

  const getGenres = () => {
    const arrayGenres: string[] = [];

    filter.forEach((item: ICardsFetch) => {
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
    setInformationsSearchs({ ...informationsSearchs, lastSearch: form });
  }, [search]);

  return (
    <div className={`${styles.container} fadeInUp`}>
      <Head>
        <title>Games Free</title>
        <meta
          name="description"
          content="Here you are Informations about free games. Free to Play forever!"
        />
        <link rel="canonical" href="https://games-free-to-play.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content="https://games-free-to-play.vercel.app/"
        />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Games Free" />
        <meta
          property="og:description"
          content="Here you have informations about free games. Free to Play forever!"
        />
        <meta
          property="og:image"
          content="https://www.freetogame.com/g/466/thumbnail.jpg"
        />
        <meta property="og:image:alt" content="Valorant" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1217949519178812"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <header>
        <ul className={styles.navBar}>
          <li
            onClick={() => {
              setCategory([]);

              if (screen.width < 640 || screen.height < 480) {
                window.scrollTo(0, 200);
              } else {
                window.scrollTo(0, 500);
              }
            }}
          >
            Home
          </li>
          <li onClick={() => filterGenres("Shooter")}>Shooter</li>
          <li onClick={() => filterGenres("MMO")}>MMO</li>
          <li onClick={() => filterGenres("Strategy")}>Strategy</li>
        </ul>
      </header>

      <ToastContainer />

      <section className={styles.intro}>
        <div className={styles.search}>
          <div>
            <h1>Games Free</h1>
            <p>
              Here you have informations about free games to PC and Browsers.
              Free to Play forever!
            </p>
          </div>

          <div className={styles.searchBox}>
            <form onSubmit={(event) => filterGames(form, event)}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search about game or category"
                onChange={(e) => setForm(e.target.value)}
                list="genres"
              />

              <datalist id="genres" className={styles.dataListGenres}>
                {genres.map((genre, index) => {
                  return <option key={index} value={genre} />;
                })}
              </datalist>

              <button type="submit">
                <ImRocket />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.illustration}>
          <Image
            src={gamesIllustration}
            height={500}
            width={500}
            alt="Boy play video-games"
            priority
          />
        </div>
      </section>

      {search && search.length > 0 && (
        <section id="searchContainer" className={styles.searchContent}>
          <h2>Search result for: {informationsSearchs?.lastSearch}.</h2>
          <SearchCarousel data={search} filter={filterGames} />
        </section>
      )}

      {error && (
        <section className={styles.searchContent}>
          <h2 className={styles.errorMessage}>{error}</h2>
        </section>
      )}

      {category && category.length > 0 ? (
        <section className={styles.category} id="filteredGames">
          <h2>{informationsSearchs?.genre}</h2>

          <div className={styles.cardGrid}>
            {category.map((item: ICardsFetch) => {
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
                  filter={filterGames}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <section className={styles.content} id="content">
          <h2>Popular</h2>

          <SearchCarousel data={relevance} filter={filterGames} />

          <h2>Recents</h2>

          <SearchCarousel data={release} filter={filterGames} />
        </section>
      )}
      <Footer />
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
      redirect: "/404",
    };
  }

  return {
    props: {
      relevance: relevance.data.slice(0, 50),
      release: release.data.slice(0, 50),
      filter: relevance.data,
    },
    revalidate: 60 * 60 * 48,
  };
};

export default Home;
