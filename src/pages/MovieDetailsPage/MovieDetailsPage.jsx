import { useEffect, useState, useRef, Suspense } from "react"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"
import { getDetails, getURL4Iamge } from "../../api/TMDB"
import css from './MovieDetailsPage.module.css'
import Loader from "../../components/Loader/Loader"
import MovieDetails from "../../components/MovieDetails/MovieDetails"

function MovieDetailsPage({ setErrMsg = () => { } }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const { movieId } = useParams()

  useEffect(() => {
    async function getData() { 
      try {
        setErrMsg('')
        setLoading(true)
        const mdata = await getDetails(movieId)
        setData(mdata)
      } catch (err) {
        setErrMsg(err.message)
      } finally {
        setLoading(false)
      }
    }

    movieId && getData()
  },[movieId])
  
  const location = useLocation()
  const backLink = useRef(location.state)
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(backLink.current ?? '/movies')
  }

  const getActiveClass = ({ isActive }) => {
    return css.link + ' ' + (isActive ? css.active : '')
  }
  return (
    <div className={css.theMovie}>
      <div>
        <button onClick={handleGoBack} className={css.goBack}><FaArrowLeftLong className={css.leftArrow} /> Go back</button>
      </div>
      {loading && <Loader />}
      {data.title && <MovieDetails {...data} />}
      <div className={css.additional}>
        <p>Additional information</p>
        <ul>
          <li><NavLink to="cast" className={getActiveClass} >Cast</NavLink></li>
          <li><NavLink to="reviews" className={getActiveClass}>Reviews</NavLink></li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
 }

export default MovieDetailsPage