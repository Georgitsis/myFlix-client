import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../sign-up-view/sign-up-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  let [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  //console.log(storedUser);
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  let [signUp, setSignUp] = useState(null);

  const handleOnLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

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
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            handleOnLoggedOut();
          }}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={8}>
                    <SignUpView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!storedUser ? (
                  <Navigate to={"/login"} replace />
                ) : (
                  <Col md={6}>
                    <MovieView
                      className="mb-3"
                      movieList={movies}
                      username={user.Username}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!storedUser ? (
                  <Navigate to={"/login"} replace />
                ) : (
                  <>
                    {movies.map((movie) => {
                      return (
                        <Col className="mb-3" md={4}>
                          <MovieCard key={movie.id} movieData={movie} />
                        </Col>
                      );
                    })}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                {!user ? (
                  <Navigate to={"/login"} /*replace*/ />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      user={user}
                      token={token}
                      onLoggedOut={() => {
                        handleOnLoggedOut();
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
