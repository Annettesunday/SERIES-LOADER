import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText
} from "@testing-library/react";
import EpisodesList from "../EpisodesList";
import { IEpisodeProps } from "../interfaces";
import { episodes } from "../MockData";

afterEach(cleanup);

describe("<EpisodesList />", () => {
  function renderEpisodesComponent(props: Partial<IEpisodeProps> = {}) {
    const defaultProps = {
      episodes,
      store: {
        state: {
          episodes,
          favorites: []
        },
        dispatch: jest.fn()
      },
      toggleFavAction: jest.fn(),
      favorites: []
    };
    return render(<EpisodesList {...defaultProps} {...props} />);
  }
  test("matches snapshot", () => {
    const { asFragment } = renderEpisodesComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test("it displays the episode provided via props", async () => {
    const { getByTestId, queryByTestId } = renderEpisodesComponent();
    const episodeName = await getByTestId(/episode-name/i);
    const seasonDetails = await getByTestId(/season-number-test/i);
    const episodeContainer = await queryByTestId(/episode-box/i);

    expect(episodeContainer).toBeTruthy();
    expect(episodeName.textContent).toBe("Pilot");
    expect(seasonDetails.textContent).toBe("Season: 1 Number: 1");
  });

  test("it should display a button with the text fave on initial render", async () => {
    const { getByTestId } = renderEpisodesComponent();

    const faveButton = await getByTestId(/button-test/i);
    expect(faveButton.textContent).toBe("Fave");
  });

  test("toggleFavAction method should be called when fave button is clicked", async () => {
    const toggleFavAction = jest.fn();
    const { getByTestId } = renderEpisodesComponent({
      toggleFavAction
    });

    const faveButton = await getByTestId("button-test");
    fireEvent.click(faveButton);
    expect(toggleFavAction).toHaveBeenCalled();
  });
});
