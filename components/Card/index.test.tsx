import Card from ".";
import { render, screen, fireEvent } from "../../test/index";
import { ICard } from "interfaces";

const mock: ICard = {
  title: "Title",
  short_description: "Short description",
  developer: "Developer",
  freetogame_profile_url: "https://freetogame.com/profile/",
  game_url: "https://freetogame.com/game/",
  genre: "Shooter",
  id: 1,
  platform: "PC (Windows)",
  publisher: "Publisher",
  release_date: "Release date",
  thumbnail: "https://freetogame.com/thumbnail/",
  filter: jest.fn(),
};

describe("Card", () => {
  it("should render a Card with mock data", () => {
    render(<Card {...mock} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(mock.short_description)).toBeInTheDocument();

    const svgs = screen.getAllByRole("figure");
    svgs.forEach((svg) => expect(svg).toBeInTheDocument());

    expect(screen.getByText(mock.genre)).toBeInTheDocument();
  });

  it("should call filter function when clicking on genre", () => {
    render(<Card {...mock} />);

    const genre = screen.getByText(mock.genre);
    expect(genre).toBeInTheDocument();

    fireEvent.click(genre);
    expect(mock.filter).toHaveBeenCalledWith(mock.genre);
  });
});
