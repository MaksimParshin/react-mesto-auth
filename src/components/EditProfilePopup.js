import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpend, onClose, onUpdateUser, isLoading, handleCloseOverlay }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpend]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {

    e.preventDefault();

 
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpend={isOpend}
      onClose={onClose}
      buttonText={`${isLoading ? "Сохранение..." : "Сохранить"}`}
      onSubmit={handleSubmit}
      handleCloseOverlay={handleCloseOverlay}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_value_username"
          type="text"
          placeholder="Введите имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__error name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_value_profession"
          type="text"
          placeholder="Введите профессию"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__error about-error"></span>
      </label>
    </PopupWithForm>
  );
}
