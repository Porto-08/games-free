import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card";
import styles from "../../pages/styles.module.scss";
import { ICardsFetch } from "../../interfaces";

interface ISearchCarouselProps {
    data: ICardsFetch[];
    filter: (form: string) => void;
}

const SearchCarousel = ({ data, filter }: ISearchCarouselProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1335 },
      items: 3.5,
      partialVisibilityGutter: 40,
    },
    smallDesktop: {
      breakpoint: { max: 1336, min: 1025 },
      items: 2.5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      draggable={true}
      itemClass={styles.card}
      containerClass={styles.carousel}
      swipeable={true}
      partialVisible={true}
      ssr={true}
    >
      {data.map((item: ICardsFetch) => {
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
            filter={filter}
          />
        );
      })}
    </Carousel>
  );
};

export default SearchCarousel;
