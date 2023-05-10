import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Register() {
  return (
    <div className="sign">
    <div className="sign__container">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" method="post" name="login__form">
        <label className="sign__label">
          <input
            className="sign__input"
            type="email"
            placeholder="E-mail"
            name="email"
            required
          />
          <span className="sign__error name-error"></span>
        </label>
        <label className="sign__label">
          <input
            className="sign__input"
            type="text"
            placeholder="Пароль"
            name="password"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="sign__error about-error"></span>
        </label>

        <button
          type="submit"
          className="sign__submit-button"
          aria-label="войти"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__question">Уже зарегистрированы? <NavLink to="/sign-in" className="sign__question-link">Войти</NavLink></p>
    </div>
  </div>
  )
}
