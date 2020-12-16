import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  open(placeName, placeLink) {
    this._popup.querySelector('.popup__place-image').src = placeLink;
    this._popup.querySelector('.popup__place-caption').textContent = placeName;
    super.open();
  }
}
