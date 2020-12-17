import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  open(placeName, placeLink) {
    this._imageElement = this._popup.querySelector('.popup__place-image');
    this._imageElement.src = placeLink;
    this._imageElement.alt = placeName;
    this._popup.querySelector('.popup__place-caption').textContent = placeName;
    super.open();
  }
}
