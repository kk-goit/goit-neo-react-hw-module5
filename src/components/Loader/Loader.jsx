import css from './Loader.module.css'
import { Rings } from "react-loader-spinner"

function Loader() { 
  return (
    <div className={css.loader}>
      <Rings color="green" />
    </div>
  )
}

export default Loader