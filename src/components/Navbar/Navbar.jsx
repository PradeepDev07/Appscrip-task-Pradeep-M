
import React, { useState } from 'react'
import Style from './navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '/logo.svg'
import { useStore } from '../../context/store'


const Linkes = [{ name: "SHOP", path: "/shop" }, { name: "SKILL", path: "/skill" }, { name: "STORIES", path: "/stories" }, { name: "ABOUT", path: "/about" }, { name: "CONTACT US", path: "/contact-us" }, { name: "LOGIN", path: "/login" }, { name: "SIGN UP", path: "/sign-up" }];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isUserSignedIn, signOut } = useStore();
    console.log(pathname);
    //functio 

    const handelKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Search Term:', searchTerm);
            if (searchTerm.trim()) {
                navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            } else {
                navigate('/shop');
            }
            setSearchTerm("");
            setIsSearchOpen(false);
        }
    }

    return (
        <header>
            <div className={Style['sub-logo-container']}>
                {

                    [...Array(3)].map((_, index) => (
                        <div className={Style['sub-logo']} key={index}>
                            <img src="/sublogo.svg" alt="Logo" height={14} width={14} />
                            <span className=''>Lorem ipsum dolor</span>
                        </div>
                    ))}
            </div>
            <nav className={Style['nav-container']}>
                <div className={Style['logo-container']}>
                    <img
                        src="/menu.svg"
                        alt="Menu"

                        className={`${Style['menu-icon']} ${Style['m-icon-wh']}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    <Link to="/">
                        <img src={Logo} alt="Logo" height={20} width={20} />
                    </Link>
                </div>
                <div>
                    <h1 className={Style['logo']}>LOGO</h1>
                </div>
                <div className={Style['logo-container']}>

                    <img
                        src="/search.svg"
                        alt="Search"

                        className={`${Style['icon']} ${Style['icon-wh']}`}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    />
                    <img src="/fav.svg" alt="fav" height={20} width={20} className={`${Style['icon']} ${Style['icon-wh']}`} onClick={()=>navigate("/favorites")}/>
                    <img src="/cart.svg" alt="Cart" height={20} width={20} className={`${Style['icon']} ${Style['icon-wh']}`} onClick={()=>navigate("/cart")}/>

                </div>

            </nav>

            <div className={`${Style['search-container']} ${isSearchOpen ? Style['open'] : ''}`}>
                <input type="text" placeholder="Search..." className={Style['search-input']} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handelKeyDown} />
            </div>

            <div className={`${Style['menu-links']} ${isMenuOpen ? Style['active'] : ''}`}>
                <ul className={Style['nav-links']}>
                    {Linkes.filter(page => {
                        if (isUserSignedIn) {
                            return page.name !== "LOGIN" && page.name !== "SIGN UP";
                        }
                        return true;
                    }).map((page, index) => (
                        <Link to={page.path} key={index}>
                        <li 
                            className={pathname === page.path ? Style['active-link'] : ''}
                            onClick={() => setActive(page.name)}>
                            {page.name}
                        </li>
                        </Link>
                    ))}
                    {isUserSignedIn && (
                        <li 
                            className={Style['logout-link']}
                            onClick={() => {
                                signOut();
                                navigate('/');
                                setActive("");
                            }}>
                            LOGOUT
                        </li>
                    )}
                </ul>
                <hr className={Style['divider']} />
            </div>
            <div  className={Style['hidden']}>
                <span className=''>HOME | <span>{active}</span></span>
            </div>


        </header>
    )
}

export default Navbar;