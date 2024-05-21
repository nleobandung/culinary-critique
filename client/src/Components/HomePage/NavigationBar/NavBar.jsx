import './NavBar.css'


const Navbar = () => {
    return (
        <div className = 'nav'>
            <div className='nav-logo'>Culinary-Critique</div>
            <ul className='nav-menu'> 
                <li>Home</li>
                <li>Explore</li>
                <li>About</li>
                <li className='nav-profile'>Profile</li>
            </ul>
        </div>
    )
}

export default Navbar
