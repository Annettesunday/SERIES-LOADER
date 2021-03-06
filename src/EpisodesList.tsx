import React from "react";
import { IEpisode } from "./interfaces";

export default function EpisodesList(props: any) {
  const { episodes, toggleFavAction, favorites, store } = props;
  const { state, dispatch } = store;
  return (
    episodes.length > 0 &&
    episodes.map((episode: IEpisode) => {
      return (
        <section
          key={episode.id}
          className="episode-box"
          data-testid="episode-box"
        >
          <img
            src={episode.image && episode.image.medium}
            alt={`Rick and Morty ${episode.name}`}
          />
          <div data-testid="episode-name">{episode.name}</div>
          <section style={{ display: "flex", justifyContent: "space-between" }}>
            <div data-testid="season-number-test">
              Season: {episode.season} Number: {episode.number}
            </div>
            <button
              type="button"
              data-testid="button-test"
              onClick={() => toggleFavAction(state, dispatch, episode)}
            >
              {favorites.find((fav: IEpisode) => fav.id === episode.id)
                ? "Unfave"
                : "Fave"}
            </button>
          </section>
        </section>
      );
    })
  );
}
