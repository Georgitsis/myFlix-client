import "./movie-view.scss";
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

export const MovieView = ({
  movieList,
  username,
  token,
  addToFavList,
  removeFromFavList,
  favoriteMovies,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  let movieToDisplay = "";
  for (i = 0; i < movieList.length; i++) {
    if (params.movieId === movieList[i].id) {
      movieToDisplay = movieList[i];
      break;
    }
  }

  const handleAddToFavorites = () => {
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users/${username}/favorites/${movieToDisplay.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Movie added to favorites List");
        addToFavList(movieToDisplay.id);
      } else alert("Something went wrong.");
    });
  };

  const handleRemoveFromFavorites = () => {
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users/${username}/favorites/${movieToDisplay.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Movie removed from favorites List");
        removeFromFavList(movieToDisplay.id);
      } else alert("Something went wrong.");
    });
  };

  let buttonFunction = handleAddToFavorites;
  let buttonText = "Add to favorites";
  for (i = 0; i < favoriteMovies.length; i++) {
    if (params.movieId === favoriteMovies[i].id) {
      buttonFunction = handleRemoveFromFavorites;
      buttonText = "Remove from favorites";
      break;
    }
  }

  return (
    <>
      <Card className="movie-view-card">
        <Card.Img
          className="movie-view-card-img"
          src={movieToDisplay.imageUrl}
        />
        <Card.Body>
          <Card.Title>{movieToDisplay.title}</Card.Title>
          <Card.Text>
            <div>
              <span>Genre: </span>
              <span>{movieToDisplay.genre.name}</span>
            </div>
            <div>
              <span>Director: </span>
              <span>{movieToDisplay.director.name}</span>
            </div>
            <div>
              <span>Description: </span>
              <span>{movieToDisplay.description}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Button onClick={buttonFunction}>{buttonText}</Button>

      <Link to={"/"}></Link>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </>
  );
};
MovieView.propTypes = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  addToFavList: PropTypes.func.isRequired,
  removeFromFavList: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};
