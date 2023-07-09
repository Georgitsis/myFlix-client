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
