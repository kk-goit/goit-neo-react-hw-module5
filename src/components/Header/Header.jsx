import { NavLink } from 'react-router-dom'
import css from './Header.module.css'

function Header() { 
  const getActiveClass = ({ isActive }) => {
    return css.link + ' ' + (isActive ? css.active : '')
  }

  return (
    <header className={css.header}>
      <div className={css.nav}>
        <NavLink to="/" className={getActiveClass}>Home</NavLink>
        <NavLink to="/movies" className={getActiveClass}>Movies</NavLink>
      </div>
      <hr/>
    </header>
  )
}

export default Header