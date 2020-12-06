export class UserInfo {
  constructor({nameSelector, passionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._passion = document.querySelector(passionSelector);
    this._profileInfoObj = {};
  }

  getUserInfo() {
    return this._profileInfoObj = {
      name: this._name.textContent,
      passion: this._passion.textContent
    }
  }

  setUserInfo({name, passion}) {
    this._name.textContent = name;
    this._passion.textContent = passion;
  }
}
