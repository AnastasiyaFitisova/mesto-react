import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  function handleUpdateUser(data) {
    api.correctUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

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
          onClose={closeAllPopups} />

      </CurrentUserContext.Provider>

    </div>
  );
};

export default App;
