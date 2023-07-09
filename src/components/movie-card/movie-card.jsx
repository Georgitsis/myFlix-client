import PropTypes from "prop-types";
export const MovieCard = ({ movieData, onMovieCardClick }) => {
  return (
    <div
      onClick={() => {
        onMovieCardClick(movieData);
      }}
    >
      {movieData.title}
    </div>
  );
};
MovieCard.protoTypes = {
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
