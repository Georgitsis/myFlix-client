import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Godfather",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      description:
        "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
      genre: {
        name: "Crime",
      },
      director: {
        name: "Francis Ford Coppola",
      },
    },
    {
      id: 2,
      title: "Fight Club",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
      description:
        "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      genre: {
        name: "Drama",
      },
      director: {
        name: "David Fincher",
      },
    },
    {
      id: 3,
      title: "Once Upon a Time... in Hollywood",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
      description:
        "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
      genre: {
        name: "Comedy",
      },
      director: {
        name: "Quentin Tarantino",
      },
    },
  ]);

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

export default MainView;
