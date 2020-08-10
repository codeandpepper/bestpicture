import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";

import Movie from "./movie";
import MovieCard from "./Card/MovieCard";
import MovieSkeleton from "./Skeleton/MovieSkeleton";

export const LIST_MOVIES = gql`
  query ListMovies {
    movies: listMovies {
      ...MovieCardFragment
    }
  }
  ${MovieCard.fragments.card}
`;

interface MoviesData {
  movies: Movie[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(3),
      display: "grid",
      gridGap: "1rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    },
  })
);

const MoviesListPage = () => {
  const classes = useStyles();
  const { loading, data } = useQuery<MoviesData>(LIST_MOVIES);

  return (
    <Container maxWidth="xl" className={classes.container}>
      {loading &&
        Array.from(new Array(12)).map((_, index: number) => (
          <div key={index}>
            <MovieSkeleton />
          </div>
        ))}

      {(data?.movies || []).map((movie: Movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </Container>
  );
};

export default MoviesListPage;
