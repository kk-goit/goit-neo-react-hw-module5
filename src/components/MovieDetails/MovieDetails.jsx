import { getURL4Iamge } from "../../api/TMDB"
import css from "./MovieDetails.module.css"

function MovieDetails({
  title = "",
  release_date = "",
  genres = [],
  overview = "",
  poster_path = false,
  vote_average = 0 })
{ 
  return (
    <div className={css.details}>
      <img src={getURL4Iamge(poster_path)} alt={title} width={250} />
      <div className={css.detailsInfo}>
        <h2>{`${title} (${release_date.split('-')[0]})`}</h2>
        <p>{`User Score: ${Math.round(vote_average * 10)}%`}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.map(itm => <span key={itm.id}>{itm.name}</span>)}</p>
      </div>
    </div>
  )
}

export default MovieDetails