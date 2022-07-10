export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
        'Content-type': 'application/json',
        'Authorization': this._token
      }
    };

    _checkResult(res) {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    };
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResult);
  };

  addCard(inputName, inputLink) {
    const body = {
      name: inputName,
      link: inputLink
    };

    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(this._checkResult);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResult);
  };

  correctUserInfo(userName, userPosition) {
    const body = {
      name: userName,
      about: userPosition
    };

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(this._checkResult);
  };

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResult);
  };

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResult);
  };

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResult);
  };

  changeUserAvatar(userAvatar) {
    const body = {
      avatar: userAvatar
    };

    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(this._checkResult);
  };

};

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-43', 
'8636da29-c732-4db2-9071-001062507334');

export default api;