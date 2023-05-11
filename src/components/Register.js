import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Register() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(formValue.password, formValue.email).then((res) => {
      navigate("/sign-in", { replace: true });
    });
  }

  return (
    <div className="sign">
      <div className="sign__container">
        <h2 className="sign__title">Регистрация</h2>
        <form
          onSubmit={handleSubmit}
          className="sign__form"
          method="post"
          name="login__form"
        >
          <label className="sign__label">
            <input
              className="sign__input"
              type="email"
              placeholder="E-mail"
              name="email"
              required
              value={formValue.email}
              onChange={handleChange}
            />
            <span className="sign__error name-error"></span>
          </label>
          <label className="sign__label">
            <input
              className="sign__input"
              type="password"
              placeholder="Пароль"
              name="password"
              required
              minLength="2"
              maxLength="200"
              value={formValue.password}
              onChange={handleChange}
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
        <p className="sign__question">
          Уже зарегистрированы?{" "}
          <NavLink to="/sign-in" className="sign__question-link">
            Войти
          </NavLink>
        </p>
      </div>
    </div>
  );
}
