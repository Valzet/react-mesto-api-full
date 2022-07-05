class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me `,
      {
        method: "PATCH",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: "POST",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
  }
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
  }
  addAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkResponse)
  }
}

// baseUrl: 'http://api.mesto-foreve.students.nomoredomains.sbs/',


 export  const api = new Api({
  // baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  baseUrl: `http://localhost:3001`,
  headers: {
    'authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});