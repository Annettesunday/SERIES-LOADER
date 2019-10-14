import React from "react";
import { render, cleanup } from "@testing-library/react";
import FavPage from "../FavPage";
import EpisodesList from "../EpisodesList";

afterEach(cleanup);

describe("<FavPage/>", () => {
  function renderFavComponent() {
    const episodes = [
      {
        airdate: "2013-12-02",
        airstamp: "2013-12-03T03:30:00+00:00",
        airtime: "22:30",
        id: 14308,
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_landscape/15/37912.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/15/37912.jpg"
        },
        name: "Pilot",
        number: 1,
        runtime: 30,
        season: 1,
        summary:
          "<p>Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.</p>",
        url: "http://www.tvmaze.com/episodes/14308/rick-and-morty-1x01-pilot"
      }
    ];
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
    return render(
      <FavPage>
        <EpisodesList {...defaultProps} />
      </FavPage>
    );
  }
  test("matches snapshot", async () => {
    const { asFragment } = renderFavComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
