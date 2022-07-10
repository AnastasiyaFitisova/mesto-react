import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar"
            src={userAvatar}
            alt="фото профиля"
          />
          <div className="profile__overlay"
            onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__set-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__position">{userDescription}</p>
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
                src={card.link}
                name={card.name}
                onCardClick={onCardClick}
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