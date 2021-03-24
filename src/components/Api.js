export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.url, {
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

  // другие методы работы с API
}
