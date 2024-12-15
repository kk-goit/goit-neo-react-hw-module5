import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReviews } from "../../api/TMDB"
import Loader from "../Loader/Loader"
import MovieReview from "../MovieReview/MovieReview"
import css from "./MovieReviews.module.css"

function MovieReviews({ setErrMsg = () => { }, noReview = "We don't have any reviews for this movie." }) { 
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { movieId } = useParams()

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        setErrMsg('')
        const reviews = await getReviews(movieId)
        setData(reviews.results)
      } catch (err) {
        setErrMsg(err.message)
      } finally {
        setLoading(false)
      }
    }

    movieId && getData()
  }, [movieId])

  return (
    <div className={css.theReviews}>
      {loading && <Loader />}
      {!loading && (data.length > 0 && <ul className={css.reviewsList}>{data.map(itm => <MovieReview key={itm.id} {...itm} />)}</ul> || <p>{noReview}</p>)}
    </div>
  )
}

export default MovieReviews