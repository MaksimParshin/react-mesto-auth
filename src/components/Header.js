import React from "react";
import logo from "../images/logo.svg";
import { NavLink, Routes, Route } from "react-router-dom";

export default function Header({userEmail, signOut}) {

  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="Логотип место" />
      </div>
      {/* <Routes>
        <Route path='/sign-up' element={<NavLink to='/sign-in' className="header__link">Войти</NavLink>}/>
      </Routes> */}
      <div>
        <span className="header__email">{userEmail.email}</span>
        <button onClick={signOut} className="header__button-exit">Выйти</button>
      </div>
    </header>
  );
}
