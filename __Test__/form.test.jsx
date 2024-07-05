// import { render, screen, fireEvent } from '@testing-library/react';
// import Form from '../app/components/Form';

// describe('Form Component', () => {
//   it('submits the form successfully', async () => {
//     render(<Form />);

//     const presentCollegeInput = screen.getByLabelText('Present College');
//     act(()=> {

//         fireEvent.change(presentCollegeInput, { target: { value: 'Sample College' } });
//     })

//     const submitButton = screen.getByRole('button', { name: 'Submit' });
//     fireEvent.click(submitButton);

//     // You can add more assertions here based on your form submission logic
//   });
// });

// Form.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
import Form from "../app/components/Form";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mock = new MockAdapter(axios);

describe("Form Component", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("renders form and input elements", () => {
    render(<Form />);
    expect(screen.getByLabelText(/present college/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    render(<Form />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/presentCollege is a required field/i)
      ).toBeInTheDocument();
    });
  });

  test("submits form successfully", async () => {
    mock
      .onPost("/api/students")
      .reply(200, { message: "Form submitted successfully" });

    render(<Form />);
    fireEvent.input(screen.getByLabelText(/present college/i), {
      target: { value: "Test College" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Form submitted successfully");
    });
  });

  test("handles form submission error", async () => {
    mock.onPost("/api/students").reply(500, { message: "Form not submitted" });

    render(<Form />);
    fireEvent.input(screen.getByLabelText(/Present College/i), {
      target: { value: "Test College" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Error submitting the form",
        "Form not submitted"
      );
    });
  });

  test("fetches data on mount", async () => {
    mock.onGet("/api/students").reply(200, []);

    render(<Form />);
    await waitFor(() => {
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe("/api/students");
    });
  });

  test("handles data fetching error", async () => {
    mock.onGet("/api/students").reply(500, { message: "Fetch error" });

    render(<Form />);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Error fetching the data",
        "Fetch error"
      );
    });
  });
});
