export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => Promise.reject(err));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
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
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
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
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  deletePlaceTask(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  putLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  deleteLikeTask(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }
}
