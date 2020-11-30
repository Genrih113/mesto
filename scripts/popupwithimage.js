import { Popup } from "./popup.js";
export class PopupWithImage extends Popup {
  open(placeName, placeLink) {
    this.popup.querySelector('.popup__place-image').src = placeLink;
    this.popup.querySelector('.popup__place-caption').textContent = placeName;
    super.open();
  }
}
