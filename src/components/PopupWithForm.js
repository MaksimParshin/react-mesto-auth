import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  onClose,
  isOpend,
  onSubmit,
  handleCloseOverlay

}) {


  return (
    <div className={`popup popup_name_${name} ${isOpend ? "popup_opend" : ""}`} onClick={handleCloseOverlay}>
      <div className={`popup__container popup__container_name_${name}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_name_${name}`}
          method="post"
          name={`form-popup_name_${name}`}
        >
          {children}

          <button
            type="submit"
            className="popup__submit-button popup__submit-button_state_save"
            aria-label="создать аватар"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
