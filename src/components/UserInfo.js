export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.job = this._userJob.textContent;
    return userData;
  }

  setUserInfo({name, job}) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
