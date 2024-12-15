import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import css from "./MoviePaginator.module.css"

function MoviePaginator({ page = 1, total = 1, setCurPage = () => { } }) {
  function handleClick(direction) {
    page += direction
    if (page > total)
      page = total
    if (page < 1)
      page = 1
    setCurPage(page)
  }
  
  return (
    <p className={css.paginator}>
      {page > 1 && <button onClick={() => handleClick(-1)}><FaArrowLeftLong /></button> || <span className={css.empty}></span>}
      <span className={css.pages}>{page} / {total}</span>
      { page < total && <button onClick={()=>handleClick(1)}><FaArrowRightLong /></button> || <span className={css.empty}></span>}
    </p>
  )
}

export default MoviePaginator