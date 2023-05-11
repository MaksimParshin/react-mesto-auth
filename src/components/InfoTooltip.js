import React from 'react'
import rec1 from '../images/rec1.svg'

export default function InfoTooltip({ name, title, isOpend, onClose, handleCloseOverlay }) {
  return (
    <div className={`popup popup_name_${name} ${isOpend ? "popup_opend" : ""}`} onClick={handleCloseOverlay}>
      <div className={`popup__container popup__container_name_${name}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <img className="popup__img-tooltip" src={rec1} alt="крестик"/>
        <h2 className="popup__title-tooltip">{title}</h2>
       
      </div>
    </div>
  )
}
