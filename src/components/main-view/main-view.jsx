import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../sign-up-view/sign-up-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!storedUser && !signUp ? (
        <Col md={4}>
          <LoginView
            onLoggedIn={(username, token) => {
              setUser(username);
              setToken(token);
            }}
            onSignUp={(_bool) => {
              setSignUp(_bool);
            }}
          />
        </Col>
      ) : signUp ? (
        <Col md={8}>
          <SignUpView
            offSignUp={() => {
              setSignUp(false);
            }}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movieData={selectedMovie}
            setSelectedMovieToNull={() => setSelectedMovie(null)}
          />
        </Col>
      ) : (
        <>
          {movies.map((movie) => {
            return (
              <Col className="mb-3" md={4}>
                <MovieCard
                  key={movies.id}
                  movieData={movie}
                  onMovieCardClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            );
          })}
          <Button
            className="logout-btn"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logffffggg
          </Button>
        </>
      )}
    </Row>
  );
};
