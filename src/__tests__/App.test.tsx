import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";
import { async } from "q";

afterEach(cleanup);

describe("<App />", () => {
  function renderAppComponent() {
    return render(<App />);
  }
  test("should match snapshot", () => {
    const { asFragment } = renderAppComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test("favorites should be set to 0 when App first renders", async () => {
    const { findByTestId } = renderAppComponent();
    const favoritesValue = await findByTestId("fav-test");
    // assert that it must be 0
    expect(favoritesValue.innerHTML).toBe("Favorite(s): ");
  });
  test("that header is loaded when the App renders", async () => {
    const { findByTestId } = renderAppComponent();
    const header = await findByTestId("header-test");
    expect(header.innerHTML).toBe("Rick and Morty");
  });
});
