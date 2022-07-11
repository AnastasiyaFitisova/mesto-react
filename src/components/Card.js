import React from 'react';

function Card({src, name, likes, onCardClick}) {

  function handleCardClick() {
    onCardClick({src, name})
  };

  return (
    <li className="card">
      <div className="card__image-container">
        <img className="card__image"
          src={src}
          alt={name}
          onClick={handleCardClick}
        />
      </div>
      <div className="card__description">
        <h2 className="card__subtitle">{name}</h2>
        <div className="card__like-section">
          <button className="card__like-button"
            aria-label="Поставить лайк"
            type="button"></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
      <button className="card__del-button"
        aria-label="Удалить карточку"
        type="button">
      </button>
    </li>
  );
};

export default Card;