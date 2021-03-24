export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;
    return userData;
  }

  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
