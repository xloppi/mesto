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
    this._catch = (err) => Promise.reject(err)
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then(this._then)
    .catch(err => Promise.reject(err));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then(this._then)
    .catch(this._catch);
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
    .then(this._then)
    .catch(this._catch);
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
    .then(this._then)
    .catch(this._catch);
  }

  editAvatarTask(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
    .then(this._then)
    .catch(this._catch);
  }

  deletePlaceTask(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._then)
    .catch(this._catch);
  }

  putLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._then)
    .catch(this._catch);
  }

  deleteLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._then)
    .catch(this._catch);
  }
}
