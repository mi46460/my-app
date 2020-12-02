import React from 'react';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
    return (
            <img style={{height: 300, width: 300}} src={logo} alt="Logo" className="rotate"/>
    );
}

export default Logo;