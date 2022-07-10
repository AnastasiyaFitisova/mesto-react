import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  
  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    SetIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="page">

        <Header />

        <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name="correct-info"
          title="Редактировать профиль"
          button="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_name"
              id="input-name"
              type="text"
              name="profilename"
              placeholder="Имя пользователя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error"
              id="input-name-error">
            </span>
          </div>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_position"
              id="input-position"
              type="text"
              name="position"
              placeholder="Профессия"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error"
              id="input-position-error">
            </span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          button="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_place"
              id="input-place"
              type="text"
              name="placename"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="popup__error"
              id="input-place-error">
            </span>
          </div>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_link"
              id="input-link"
              type="url"
              name="imagelink"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error"
              id="input-link-error">
            </span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          name="card-del"
          title="Вы уверены?"
          button="Да">
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          button="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <div className="popup__input-content">
            <input className="popup__input popup__input_type_link"
              id="input-photolink"
              type="url"
              name="photolink"
              placeholder="Ссылка на изображение"
              required
            />
            <span className="popup__error"
              id="input-photolink-error">
            </span>
          </div>
        </PopupWithForm>

        <ImagePopup
        card={selectedCard} 
        onClose={closeAllPopups}/>

      </div>
      
    </>
  );
};

export default App;
