import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({ movieData, onMovieCardClick }) => {
  return (
    <Card
      onClick={() => {
        onMovieCardClick(movieData);
      }}
      className="movie-card"
    >
      <Card.Img className="movie-card-image" src={movieData.imageUrl} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
      </Card.Body>
    </Card>

    /*<div
      onClick={() => {
        onMovieCardClick(movieData);
      }}
    >
      {movieData.title}
    </div>*/
  );
};
MovieCard.propTypes = {
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
  onMovieCardClick: PropTypes.func.isRequired,
};
