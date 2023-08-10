import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-bg.png';
import classNames from '../styles/Nav.module.css';
import Account from './Account';

const Nav = ()=>{
    return (
        <nav className={classNames.nav}>
            <ul>
                <li>
                <Link to="/" className={classNames.brand}>
                    <img src={logo} alt="Learn with Sumit Logo" />
                    <h3>Learn with Sumit</h3>
                </Link>
                </li>
            </ul>
            <Account />
        </nav>
    );
}

export default Nav;