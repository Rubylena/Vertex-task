import React from "react";
import {
  render,
  screen,
  waitFor
} from "@testing-library/react";
import Form from "../app/components/Form";
import userEvent from "@testing-library/user-event";

describe("Form Component", () => {
  beforeEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the form component", () => {
    render(<Form />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByText(/student information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your present college/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/your present conference/i)
    ).toBeInTheDocument();
  });
  it("should add and remove colleges attended", async () => {
    render(<Form />);

    expect(screen.getAllByPlaceholderText("From date").length).toBe(4);

    const addCollegeButton = screen.getByText(/add college/i);
    userEvent.click(addCollegeButton);

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText("From date").length).toBe(5)
    );

    const removeButtons = screen.getAllByText(/remove/i);
    userEvent.click(removeButtons[0]);

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText("From date").length).toBe(4)
    );
  });

  it("should add and remove college sports", async () => {
    render(<Form />);

    expect(screen.getAllByPlaceholderText("Sport").length).toBe(4);

    const addSportButton = screen.getByText(/add sport/i);
    userEvent.click(addSportButton);

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText("Sport").length).toBe(5)
    );

    const removeButtons = screen.getAllByText(/remove/i);
    userEvent.click(removeButtons[removeButtons.length - 1]);

    await waitFor(() =>
      expect(screen.getAllByPlaceholderText("Sport").length).toBe(4)
    );
  });
});
