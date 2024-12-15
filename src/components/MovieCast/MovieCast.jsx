import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCredits } from "../../api/TMDB"
import Loader from "../Loader/Loader"
import MovieActor from "../../components/MovieActor/MovieActor"
import css from "./MovieCast.module.css"

function MovieCast({ setErrMsg = () => { } }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { movieId } = useParams()

  useEffect(() => {
    async function getData() {
      try {
        setErrMsg('')
        setLoading(true)
        const credits = await getCredits(movieId)
        if (credits.cast)
          setData(credits.cast.sort((a, b) => a.name.localeCompare(b.name)))
      } catch (err) {
        setErrMsg(err.message)
      } finally {
        setLoading(false)
      }
    }

    movieId && getData()
  }, [movieId])

  return (
    <div className={css.theCast}>
      {loading && <Loader />}
      <ul>
        {data.map(itm => <MovieActor key={itm.id} {...itm} />)}
      </ul>
    </div>
  )
 }

export default MovieCast