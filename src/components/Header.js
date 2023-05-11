import React from "react";
import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";

export default function Header({ userEmail, signOut}) {
  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="Логотип место" />
      </div>
      <Routes>
        <Route path='/sign-up' element={<Link to='/sign-in' className="header__link">Войти</Link>}/>
        <Route path='/sign-in' element={<Link to='/sign-up' className="header__link">Регистрация</Link>}/>
        <Route path='/main' element={ <div>
          <span className="header__email">{userEmail.email}</span>
          <button onClick={signOut} className="header__button-exit">
            Выйти
          </button>
        </div>}/>
      </Routes>
    </header>
  );
}
