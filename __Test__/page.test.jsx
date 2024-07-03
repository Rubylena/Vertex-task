// import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'
// import Home from '../app/page'

// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />)

//     const heading = screen.getByRole('heading', { level: 1 })

//     expect(heading).toBeInTheDocument()
//   })
// })

// import { render, screen } from '@testing-library/react';
// import Home from './page';

// test('renders Home component', () => {
//   render(<Home />);

//   const headingElement = screen.getByText('Home');
//   expect(headingElement).toBeInTheDocument();

//   const buttonElement = screen.getByText('open modal');
//   expect(buttonElement).toBeInTheDocument();
// });

import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Component", () => {
  test("renders heading and button", () => {
    render(<Home />);

    const headingElement = screen.getByText("Home");
    expect(headingElement).toBeInTheDocument();

    const buttonElement = screen.getByText("open modal");
    expect(buttonElement).toBeInTheDocument();
  });
});
