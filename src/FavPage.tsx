import React from "react";
import { Store } from "./Store";
import { toggleFavAction } from "./Actions";
import { IEpisodeProps } from "./interfaces";

const EpisodeList = React.lazy<any>(() => import("./EpisodesList"));

const FavPage = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  const props: IEpisodeProps = {
    episodes: state.favorites,
    store: { state, dispatch },
    toggleFavAction,
    favorites: state.favorites
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className="episode-layout" data-testid="fav-test">
        <EpisodeList {...props} />
      </div>
    </React.Suspense>
  );
};

export default FavPage;
