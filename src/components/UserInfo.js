export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;
    return userData;
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}
