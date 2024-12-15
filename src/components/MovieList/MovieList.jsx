import { Link, useLocation  } from "react-router-dom"
import css from "./MovieList.module.css"

function MovieList({ movies = [] }) { 
  const location = useLocation()

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MovieList