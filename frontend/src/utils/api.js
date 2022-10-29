class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      'Content-type': 'application/json',
      'Authorization': this._token,
    }
  }

  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Возникла ошибка')
  }

  getAllNeededData() {
    return Promise.all([this.getProfile(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  addProfile(data) {
    const body = {
      name: data.name,
      about: data.about
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }

  addCard(data) {
    const body = {
      name: data.name,
      link: data.link
    }
    return fetch(`${this._url}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  addAvatar(data) {
    const body = {
      avatar: data.avatar,
    }
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }
 }

 export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43', '13e0d01a-3631-45a5-b3a6-1a7f87295049')
