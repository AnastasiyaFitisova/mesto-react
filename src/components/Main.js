import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((d) => d._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar"
            src={currentUser.avatar}
            alt="фото профиля"
          />
          <div className="profile__overlay"
            onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__set-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__position">{currentUser.about}</p>
        </div>
        <button className="profile__add-button"
          aria-label="Добавить место"
          type="button"
          onClick={onAddPlace}>
        </button>
      </section>


      <section className="elements">
        <ul className="elements__cardholder">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            )
          }
          )}
        </ul>
      </section>

    </main>
  );
};

export default Main;