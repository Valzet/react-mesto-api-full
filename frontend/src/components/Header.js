import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from 'react-router-dom'

function Header({ userData, handleLogout }) {

  function handleClick() {
    handleLogout()
  }
  const location = useLocation();

  function setButtonName() {
    switch (location.pathname) {
      case '/signin':
        return "Регистрация";
      case "/signup":
        return "Войти";
      default:
        return "Выйти"
    }
  }
  function setButtonLink() {
    switch (location.pathname) {
      case '/signin':
        return "/signup";
      case "/signup":
        return "/signin";
      default:
        return "/signin"
    }
  }


  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />

      <div className="header__container">
        <p className="header__container_type_email">{userData}</p>
        <Link to={setButtonLink} className="link">
          <p type='button' className="button header__container_type_button" onClick={handleClick}>{setButtonName()}</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;