import React from 'react';
import Mestologo from '../images/header/Mestologo.svg'

function Header() {
  return (
    <header className="header">
      <img className="header__logo"
        src={Mestologo}
        alt="логотип страницы"
      />
    </header>
  );
};

export default Header;