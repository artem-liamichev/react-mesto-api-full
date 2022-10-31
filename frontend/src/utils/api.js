class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  }

  _getToken = () => localStorage.getItem('jwt');

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
      headers: {
      ...this._headers,
      'Authorization': `Bearer ${this._getToken()}`,
    }
    })
      .then(this._checkServerResponse)
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      }
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
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }

  addCard(data) {
    const body = {
      name: data.name,
      link: data.link
    }
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      }    })
    .then(this._checkServerResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      }
    })
    .then(this._checkServerResponse)
  }

  addAvatar(data) {
    const body = {
      avatar: data.avatar,
    }
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
  }
 }

 export const api = new Api('http://localhost:3000')
