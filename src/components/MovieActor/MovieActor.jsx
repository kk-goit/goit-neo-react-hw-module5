import { getURL4Iamge } from "../../api/TMDB"
import css from "./MovieActor.module.css"

function MovieActor({ profile_path = false, name = "", character = ""}) {
  return (
    <li className={css.theActor}>
      <img src={getURL4Iamge(profile_path)} alt={name} width={100} />
      <div className={css.actorInfo}>
        <p>{name}</p>
        <p>Character: {character}</p>
      </div>
    </li>
  )
}

export default MovieActor