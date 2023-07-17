import "./movie-card.scss";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
export const MovieCard = ({ movieData }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movieData.id)}`}
      className="movie-card-link"
      //style={{ textDecoration: "none" }}
    >
      <Card className="movie-card h-100">
        <Card.Img className="movie-card-img" src={movieData.imageUrl} />
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>{movieData.description}</Card.Text>
          <Button>Add to favorites</Button>
        </Card.Body>
      </Card>
    </Link>
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
