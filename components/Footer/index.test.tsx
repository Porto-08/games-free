import { render, screen, fireEvent } from "../../test/index";
import Footer from ".";

describe("<Footer />", () => {
  it("should be render footer", () => {
    render(<Footer />);

    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should be scrollTop when click on arrow", () => {
    global.scrollTo = jest.fn();
    render(<Footer />);

    const arrow = screen.getByRole("button");
    expect(arrow).toBeInTheDocument();

    fireEvent.click(arrow);

    expect(scrollTo).toHaveBeenCalled();
  });
});
