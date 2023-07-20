import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../sign-up-view/sign-up-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { useParams } from "react-router";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchItem, setSearchItem] = useState([]);

  const handleOnLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const addToFavoritesList = (movieToAdd) => {
    let updatedUser = user;
    updatedUser.favoriteMovies.push(movieToAdd);
    setUser(updatedUser);
    generateNewFavoriteMovies();
  };

  const removeFromFavoritesList = (movieToRemove) => {
    let updatedUser = user;

    delete updatedUser.favoriteMovies[
      updatedUser.favoriteMovies.indexOf(movieToRemove)
    ];

    setUser(updatedUser);
    generateNewFavoriteMovies();
  };

  const generateNewFavoriteMovies = () => {
    let usersFavoriteMovies = movies.filter((m) => {
      return user.favoriteMovies.includes(m.id);
    });
    setFavoriteMovies(usersFavoriteMovies);
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
        let usersFavoriteMovies = movies.filter((m) => {
          if (user) return user.favoriteMovies.includes(m.id);
        });
        setFavoriteMovies(usersFavoriteMovies);
        console.log(favoriteMovies);
      })
      .catch((error) => {
        console.log(error);
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
          updateSearchItem={(searchItem) => {
            setSearchItem(searchItem);
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
                      favoriteMovies={favoriteMovies}
                      addToFavList={(addedMovie) => {
                        addToFavoritesList(addedMovie);
                      }}
                      removeFromFavList={(removedMovie) => {
                        removeFromFavoritesList(removedMovie);
                      }}
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
                  <Navigate to={"/login"} replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      user={user}
                      token={token}
                      onLoggedOut={() => {
                        handleOnLoggedOut();
                      }}
                      updateUser={(updatedUser) => {
                        setUser(updatedUser);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                {!user ? (
                  <Navigate to={"/login"} />
                ) : (
                  <>
                    {favoriteMovies.map((movie) => {
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
            path="/search/:searchItem"
            element={
              <>
                {!user ? (
                  <Navigate to={"/login"} />
                ) : (
                  <>
                    {
                      //console.log(params.searchItem)
                      movies
                        .filter((m) => {
                          return m.title.includes(searchItem);
                        })
                        .map((movie) => {
                          return (
                            <Col className="mb-3" md={4}>
                              <MovieCard key={movie.id} movieData={movie} />
                            </Col>
                          );
                        })
                    }
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
