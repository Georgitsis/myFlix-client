import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  let [selectedMovie, setSelectedMovie] = useState(null);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else if (selectedMovie) {
    return (
      <MovieView
        movieData={selectedMovie}
        setSelectedMovieToNull={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movies.id}
            movieData={movie}
            onMovieCardClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
