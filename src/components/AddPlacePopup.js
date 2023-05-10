import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpend,
  onClose,
  onAddPlace,
  isLoading,
  handleCloseOverlay
}) {
  const [card, setCard] = React.useState({ name: "", link: "" });

  function handleChangeCard(evt) {
    const { name, value } = evt.target;
    setCard((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: card.name,
      link: card.link,
    });
  }

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      isOpend={isOpend}
      onClose={onClose}
      buttonText={isLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
      handleCloseOverlay={handleCloseOverlay}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_value_place"
          type="text"
          placeholder="Название"
          name="name"
          required
          minLength="2"
          maxLength="30"
          value={card.name}
          onChange={handleChangeCard}
        />
        <span className="popup__error name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_value_url"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={card.link}
          onChange={handleChangeCard}
        />
        <span className="popup__error link-error"></span>
      </label>
    </PopupWithForm>
  );
}
