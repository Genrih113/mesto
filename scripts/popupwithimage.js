import { Popup } from "./popup";

export class PopupWithImage extends Popup {
  // constructor() {
  //   super()
  // }
  open () {
    this.popup.querySelector('.popup__place-image').src = this._placeLink;
    this.popup.querySelector('.popup__place-caption').textContent = this._placeName;
    super.open();
  }
}
