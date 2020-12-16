export class UserInfo {
  constructor({nameSelector, passionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._passion = document.querySelector(passionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._profileInfoObj = {};
  }

  getUserInfo() {
    return this._profileInfoObj = {
      name: this._name.textContent,
      passion: this._passion.textContent
    }
  }

  setUserInfo({name, passion}) {
    if (name && passion) {
      this._name.textContent = name;
      this._passion.textContent = passion;
    } else {
      return;
    }
  }

  setUserAvatar(avatarUrl) {
    if (avatarUrl) {
      this._avatar.src = avatarUrl;
    } else {
      return;
    }
  }
}
