import css from './MovieReview.module.css'

function MovieReview({ author = "", content = "" }) { 
  return (
    <li className={css.theReview}>
      <h3>Author: {author}</h3>
      <p>{content}</p>
    </li>
  )
}

export default MovieReview