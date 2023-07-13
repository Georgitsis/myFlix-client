import "./movie-view.scss";
import PropTypes from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
//import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

/*let navigate = useNavigate();
const routeChange = () => {
  //let path = "/";
  navigate("/");
};*/

export const MovieView = ({ movieList }) => {
  const params = useParams();
  const movieToDisplay = movieList.find((m) => {
    m.id === params.movieId;
    console.log(params.movieId);
    console.log(m.id);
  });
  console.log(movieToDisplay);
  return (
    <>
      <Card>
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
      <Button onClick={routeChange}>Back</Button>
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
