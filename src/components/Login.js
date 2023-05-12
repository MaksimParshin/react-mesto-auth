import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login({
  handleLogin,
  handleUserData,
  openToolTip,
  setIsSuccses,
}) {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.jwt) {
          setFormValue({
            email: "",
            password: "",
          });
        }

        handleUserData(formValue.email);
        navigate("/", { replace: true });
        handleLogin(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccses(false);
        openToolTip();
      });
  }

  return (
    <div className="sign">
      <div className="sign__container">
        <h2 className="sign__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
