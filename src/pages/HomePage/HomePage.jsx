import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getTrends } from "../../api/TMDB";
import MovieList from "../../components/MovieList/MovieList";
import MoviePaginator from "../../components/MoviePaginator/MoviePaginator";
import Loader from "../../components/Loader/Loader";
import css from './HomePage.module.css'

function HomePage({ setErrMsg = () => { } }) {
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const curPage = useMemo(
    () => Number(searchParams.get("page") || "1"),
    [searchParams]
  )
  function setCurPage(page) {
    setSearchParams({ page: page })
  }

  useEffect(() => { 
    async function getData() {
      try {
        setErrMsg("")
        setLoading(true)
        const data = await getTrends(curPage)
        setMovies(data)
      } catch (err) { 
        setErrMsg(err.message)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [curPage])

  return (
    <div className={css.homePage}>
      <h1>Trending today:</h1>
      {loading && <Loader />}
      {movies.results && <MovieList movies={movies.results} />}
      {movies.total_pages > 1 && <MoviePaginator page={curPage} total={movies.total_pages} setCurPage={setCurPage}/>}
    </div>
  )
}

export default HomePage