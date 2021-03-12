import {
  popularTitles,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies,
  popularActors
} from "@/api";

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { $axios, app }) {
    //Get Movies
    const resPopularMovies = await $axios.$get(popularTitles("movie"));
    const resPopularSeries = await $axios.$get(popularTitles("tv"));
    const resTopRated = await $axios.$get(topRatedMovies());
    const resUpcoming = await $axios.$get(upcomingMovies());
    const resNowPlaying = await $axios.$get(nowPlayingMovies());
    //Get Actors
    const resActors = await $axios.$get(popularActors(1));
    commit("movies/setMovies", {
      popularMovies: resPopularMovies.results,
      popularSeries: resPopularSeries.results,
      topRated: resTopRated.results,
      upcoming: resUpcoming.results,
      nowPlaying: resNowPlaying.results
    });
    commit("actors/setActors", {
      popular: resActors.results
    });
    if (app.$cookies.get("token")) {
      const token = app.$cookies.get("token");
      dispatch("authentication/tryLogin", token);
    }
  }
};
