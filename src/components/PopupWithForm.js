import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_activated" : ""}`}>
      <div className="popup__content">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form">
          {props.children}
          <button type="submit"
            className="popup__submit-button"
            aria-label="Сохранить/Подтвердить">{props.button}</button>
          <button type="button"
            className="popup__close-button"
            aria-label="Закрыть"
            onClick={props.onClose}>
          </button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;