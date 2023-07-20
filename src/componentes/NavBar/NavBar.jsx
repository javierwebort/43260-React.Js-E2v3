import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <h1>Go Market</h1>
      </Link>


      <nav>
        <ul>
          <li> <NavLink to="/categoria/2"> New </NavLink> </li>
          <li> <NavLink to="/categoria/3"> Brands </NavLink> </li>
          {/*  <li> Brands </li>
          <li> Makeup </li>
          <li> Skincare </li>
          <li> Hair </li>
          <li> Fragance </li>
          <li> Tools & Brushes </li>*/}
        </ul>
      </nav>

      <CartWidget />

    </header>
  )
}

export default NavBar