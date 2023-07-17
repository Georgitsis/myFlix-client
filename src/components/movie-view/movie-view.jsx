import "./movie-view.scss";
import PropTypes from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movieList, username, token }) => {
  const params = useParams();

  let movieToDisplay = "";
  for (i = 0; i < movieList.length; i++) {
    if (params.movieId === movieList[i].id) {
      movieToDisplay = movieList[i];
      break;
    }
  }

  const handleAddToFavorites = () => {
    console.log(username);
    console.log(movieToDisplay.id);
    console.log(token);
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
      if (response.ok) alert("Movie added to favorites List");
      else alert("Something went wrong.");
    });
  };

  console.log(movieToDisplay);
  return (
    <>
      <Card clasName="movie-view-card">
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
      <Button onClick={handleAddToFavorites}>Add to favorites</Button>
      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
    </>
  );
};
MovieView.propTypes = {
  movieToDisplay: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
