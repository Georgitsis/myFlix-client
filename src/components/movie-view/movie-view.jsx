import "./movie-view.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movieData, setSelectedMovieToNull }) => {
  return (
    <>
      <Card>
        <Card.Img className="movie-view-card-img" src={movieData.imageUrl} />
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>
            <div>
              <span>Genre: </span>
              <span>{movieData.genre.name}</span>
            </div>
            <div>
              <span>Director: </span>
              <span>{movieData.director.name}</span>
            </div>
            <div>
              <span>Description: </span>
              <span>{movieData.description}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Button onClick={setSelectedMovieToNull}>Back</Button>
    </>
  );
};
MovieView.propTypes = {
  movieData: PropTypes.shape({
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
  setSelectedMovieToNull: PropTypes.func.isRequired,
};
