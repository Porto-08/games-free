import { render, screen, fireEvent, userEvent } from "../../test/index";
import SearchCarousel from "./index";
import { ICardsFetch } from "interfaces";

let mock: ICardsFetch[] = [
  {
    title: "Game 1",
    short_description: "Game 1 Short description",
    developer: "Developer Company",
    freetogame_profile_url: "https://freetogame.com/profile/",
    game_url: "https://freetogame.com/game/",
    genre: "Shooter",
    id: 1,
    platform: "PC (Windows)",
    publisher: "Game 1 Publisher",
    release_date: "Release date",
    thumbnail: "https://freetogame.com/thumbnail/",
  },
  {
    title: "Game 2",
    short_description: "Game 2 Short description",
    developer: "Developer",
    freetogame_profile_url: "https://freetogame.com/profile/",
    game_url: "https://freetogame.com/game/",
    genre: "Action",
    id: 2,
    platform: "Browser",
    publisher: "Game 2 Publisher",
    release_date: "Release date",
    thumbnail: "https://freetogame.com/thumbnail/",
  },
];

describe("SearchCarousel", () => {
  it("should render carousel with data", () => {
    const filter = jest.fn();
    const {debug} = render(<SearchCarousel data={mock} filter={filter} />);
    

    debug();
  });
});
