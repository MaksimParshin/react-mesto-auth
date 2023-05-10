import React from "react";

export default function ImagePopup({ card, onClose, handleCloseOverlay }) {

  return (
    <div className={`popup popup_name_img ${card.isOpen  ? "popup_opend" : ''}`} onClick={handleCloseOverlay}>
      <div className="popup__container popup__container_name_img">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <img className="popup__img" src={card.elem.link !== "" ? card.elem.link : '#'} alt={card.elem.name} ></img>
        <p className="popup__img-title">{card.elem.name}</p>
      </div>
    </div>
  );
}
