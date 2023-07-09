import "./movie-view.css";
import PropTypes from "prop-types";

export const MovieView = ({ movieData, setSelectedMovieToNull }) => {
  return (
    <div>
      <div>
        <img src={movieData.imageUrl} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movieData.title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movieData.genre.name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movieData.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movieData.director.name}</span>
      </div>
      <button onClick={setSelectedMovieToNull}>Close</button>
    </div>
  );
};
