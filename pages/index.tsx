import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import gamesIllustration from "../assets/svg/games.svg";
import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICardsFetch } from "../interfaces";
import SearchCarousel from "../components/SearchCarousel";
import { ImRocket } from "react-icons/im";
import { GrLinkTop } from "react-icons/gr";
interface IHomeProps {
  release: ICardsFetch[];
  relevance: ICardsFetch[];
}

const Home = ({ release, relevance }: IHomeProps) => {
  const [form, setForm] = useState<string>();
  const [error, setError] = useState<string>();
  const [search, setSearch] = useState<ICardsFetch[]>();
  const [genres, setGenres] = useState<string[]>([]);
  const [category, setCategory] = useState<ICardsFetch[]>([]);
  const [informationsSearchs, setInformationsSearchs] = useState<any>();
  const filterGames = (form: string) => {
    window.scrollTo(0, 500);

    setForm(form);

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

      const platform = release.filter((item: ICardsFetch) => {
        return item.platform.toLowerCase().includes(form.toLowerCase());
      });

      if (platform.length > 0) return setSearch(platform);

      setError(`Not results found for ${form}`);
    }
  };

  const filterGenres = (genre: string) => {
    setInformationsSearchs({ ...informationsSearchs, genre: genre });
    setSearch([]);

    const genreFilter = release.filter((item: ICardsFetch) => {
      return item.genre.toLowerCase().includes(genre.toLowerCase());
    });

    setCategory(genreFilter);

    window.scrollTo(0, 500);
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
    setInformationsSearchs({ ...informationsSearchs, lastSearch: form });
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Games Free</title>
        <meta
          name="description"
          content="Here you are Informations about free games. Free to Play forever!"
        />
        {/* <link rel=”canonical” href=”https://exemplo.com/sapatos/sapato-vermelho-e-branco/”> */}
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
        <meta property="og:image" content="https://www.freetogame.com/g/466/thumbnail.jpg"/>
        <meta property="og:image:alt" content="Valorant"/>
        <meta property="og:image:width" content="400"/>
        <meta property="og:image:height" content="400"/>
      </Head>

      <header>
        <ul className={styles.navBar}>
          <li onClick={() => setCategory([])}>Home</li>
          <li onClick={() => filterGenres("Shooter")}>Shooter</li>
          <li onClick={() => filterGenres("Mmo")}>MMO</li>
          <li onClick={() => filterGenres("Rpg")}>RPG</li>
          <li onClick={() => filterGenres("Strategy")}>Strategy</li>
        </ul>
      </header>

      <section className={styles.intro}>
        <div className={styles.search}>
          <div>
            <h1>Games Free</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis obcaecati blanditiis beatae.
            </p>
          </div>

          <form className={styles.searchBox}>
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

            <button type="button" onClick={() => filterGames(form ?? "")}>
              <ImRocket />
            </button>
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.illustration}>
          <Image
            src={gamesIllustration}
            height={500}
            width={500}
            alt="Boy play video-games"
          />
        </div>
      </section>

      {search && search.length > 0 && (
        <section className={styles.searchContent}>
          <h2>Search result for: {informationsSearchs?.lastSearch}.</h2>
          <SearchCarousel data={search} filter={filterGames} />
        </section>
      )}

      {category && category.length > 0 ? (
        <section className={styles.category}>
          <h2>{informationsSearchs?.genre}</h2>

          <div className={styles.cardGrid}>
            {category.map((item: ICardsFetch, index: number) => {
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
                  filter={filterGenres}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <section className={styles.content}>
          <h2>Popular</h2>

          <SearchCarousel data={relevance} filter={filterGames} />

          <h2>Recents</h2>

          <SearchCarousel data={release} filter={filterGames} />
        </section>
      )}
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
