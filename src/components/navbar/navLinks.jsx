import React from 'react'
import {Link} from 'react-router-dom';

export default function navLinks({signup,login,loginClicked,signupClicked,logoutClicked}) {

    const linkStyle ={
        'text-decoration':'none'
    };
   


    return (
        <div>
        <nav className='navbar__nav'>
                <ul className="navbar__nav__list">
                    {login && <Link style={linkStyle} to='./event'> <li className="navbar__nav__list__link">event</li></Link>}
                    {login && <Link style={linkStyle} to='./people'><li className="navbar__nav__list__link">people</li></Link> }
                    {!login && <Link style={linkStyle} to='./login'> <li onClick={loginClicked} className="navbar__nav__list__link">log in</li></Link>}
                    { login && <li onClick={logoutClicked} className="navbar__nav__list__link">log out</li>}
                    {!login && !signup && <Link style={linkStyle} to='./signup'> <li onClick={signupClicked} className="navbar__nav__list__link">sign up</li></Link>} 
                    {login && <li className="navbar__nav__list__link">user</li>}
                </ul>
            </nav>
        </div>
    )
}
