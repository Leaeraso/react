function ListOfMovies({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

function NoMoviesResult() {
  return <p>No se encontraron películas</p>
}

export function Movies({ movies }) {
  return movies.length > 0 ? (
    <ListOfMovies movies={movies} />
  ) : (
    <NoMoviesResult />
  )
}
