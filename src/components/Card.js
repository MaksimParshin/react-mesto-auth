import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete}) {
 
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }
  return (
    <div className="element">
    
        <button
          className={`element__recicle-bin ${isOwn ?  'element__recicle-bin_state_active' : ''}`}
          type="button"
          aria-label="удалить карточку"
          onClick={handleDeleteClick}
        ></button>
      
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like-button ${
              isLiked ? "element__like-button_state_active" : ""
            }`}
            type="button"
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
