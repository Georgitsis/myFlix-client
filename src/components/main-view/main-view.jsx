import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  let [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            imageUrl: movie.imageUrl,
            genre: {
              name: movie.genre.name,
            },
            director: {
              name: movie.director.name,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  });

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
