import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../sign-up-view/sign-up-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  let [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  let [signUp, setSignUp] = useState(null);

  //fetches a list of movies from the given url
  useEffect(() => {
    if (!token) return;
    fetch("https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
        //console.log(signUp);
        //console.log(user);
        //console.log(selectedMovie);
      });
  }, [token]);

  if (!user && !signUp) {
    return (
      <LoginView
        onLoggedIn={(username, token) => {
          setUser(username);
          setToken(token);
          //console.log("username: " + username);
          //console.log("Tokffen: " + token);
        }}
        onSignUp={(_bool) => {
          setSignUp(_bool);
        }}
      />
    );
  } else if (signUp) {
    return <SignUpView />;
  } else if (movies.length === 0) {
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
      <button
        onClick={() => {
          setUser(null);
          //setSignUp(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
