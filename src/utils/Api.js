class Api {
  constructor({ headers, baseURL }) {
    this._headers = headers;
    this._baseURL = baseURL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(item) {
    return fetch(`${this._baseURL}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(item) {
    return fetch(`${this._baseURL}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then(this._checkResponse);
  }
  createCard(data) {
    return fetch(`${this._baseURL}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseURL}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseURL}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}



 const API = new Api({
  headers: {
    authorization: "206a79e8-9bf0-471f-b412-b2cba24c2ed9",
    "Content-Type": "application/json",
  },
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-62/",
});

export {API}