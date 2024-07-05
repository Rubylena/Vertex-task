import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Component", () => {
  test("renders the Form component", async () => {
    render(<Home />);

    const formElement = await screen.findByTestId("form");

    expect(formElement).toBeInTheDocument();
  });
});
