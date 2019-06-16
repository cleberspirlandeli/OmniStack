import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import fatecgram from './../assets/logo-fatecgram.png';
import camera from './../assets/camera.svg';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img id="logo" src={fatecgram} alt="logo fatec" />
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar publicação" />
        </Link>
      </div>
    </header>

  );
}
