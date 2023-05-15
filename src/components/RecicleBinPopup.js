import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function RecycleBinPopup({
  isOpend,
  onClose,
  onDeletCard,
  isLoading,
  handleCloseOverlay,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletCard();
  }
  return (
    <PopupWithForm
      name="card-delet"
      title="Вы уверены?"
      isOpend={isOpend}
      onClose={onClose}
      buttonText={`${isLoading ? "Удаление..." : "Удалить"}`}
      onSubmit={handleSubmit}
      handleCloseOverlay={handleCloseOverlay}
    ></PopupWithForm>
  );
}
