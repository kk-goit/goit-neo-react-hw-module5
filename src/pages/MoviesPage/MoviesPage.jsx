import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { doSearch } from "../../api/TMDB"
import MovieList from "../../components/MovieList/MovieList"
import MoviePaginator from "../../components/MoviePaginator/MoviePaginator"
import SearchMovie from "../../components/SearchMovie/SearchMovie"
import css from "./MoviesPage.module.css"
import Loader from "../../components/Loader/Loader"

function MoviesPage({ setErrMsg = () => { } }) { 
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryStr, curPage] = useMemo(
    () => [searchParams.get("query"), Number(searchParams.get("page") || "1")],
    [searchParams]
  )
  function setQuery(qStr) {
    setSearchParams({ query: qStr })
  }
  function setCurPage(page) {
    setSearchParams({ query: queryStr, page: page})
  }
  
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    async function getData() { 
      try {
        setLoading(true)
        setErrMsg('')
        setMovies({})
        const data = await doSearch(queryStr, curPage)
        setMovies(data)
      } catch (err) {
        setErrMsg(err.message)
      } finally {
        setLoading(false)
      }
    }

    queryStr && getData()
  }, [queryStr, curPage])
  
  return (
    <div className={css.moviesPage}>
      <SearchMovie onSearch={setQuery} setErrMsg={setErrMsg}/>
      <div className={css.movies} >
        {loading && <Loader />}
        {movies.results && <MovieList movies={movies.results} />}
        {movies.total_pages > 1 && <MoviePaginator page={curPage} total={movies.total_pages} setCurPage={setCurPage}/>}
      </div>
    </div>
  )
}

export default MoviesPage