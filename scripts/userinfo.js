export class UserInfo {
  constructor({nameSelector, passionSelector}) {
    this.name = document.querySelector(nameSelector);
    this.passion = document.querySelector(passionSelector);
    this.profileInfoObj = {};
  }

  getUserInfo() {
    return this.profileInfoObj = {
      name: this.name.textContent,
      passion: this.passion.textContent
    }
  }

  setUserInfo({name, passion}) {
    this.name.textContent = name;
    this.passion.textContent = passion;
  }
}
