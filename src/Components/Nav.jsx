import React from 'react'
import { Link } from 'react-router-dom';
import {FaHome} from "@react-icons/all-files/fa/FaHome"
import './Nav.css'
import GoogleApiCall from './GoogleApiCall';
const Nav = () => {
    
    return (
        <nav className='nav'>
         <div className="button">
            <Link to = '/'><button><span><FaHome /></span> HOME</button></Link>
        </div>
           <GoogleApiCall />
        </nav>
    )
}

export default Nav
