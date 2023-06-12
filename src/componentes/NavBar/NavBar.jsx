import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'


const NavBar = () => {
  return (
    <header>
        <h1>Go Market</h1>

        <nav>
            <ul>
                <li>New</li>
                <li>Brands</li>
                <li>Makeup</li>
                <li>Skincare</li>
                <li>Hair</li>
                <li>Fragance</li>
                <li>Tools & Brushes</li>
            </ul>
        </nav>
        
        <CartWidget/>

    </header>
  )
}

export default NavBar