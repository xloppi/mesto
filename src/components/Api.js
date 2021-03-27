export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
    this._then = (res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then(this._then);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then(this._then);
  }

  editProfileTask(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._then);
  }

  addPlaceTask(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._then);
  }

  editAvatarTask(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
    .then(this._then);
  }

  deletePlaceTask(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._then);
  }

  putLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._then);
  }

  deleteLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._then);
  }
}
