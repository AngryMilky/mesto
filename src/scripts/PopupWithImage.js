import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popupSelector.querySelector('.popup__photo');
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupCaption.textContent = name;
  }

}

export default PopupWithImage;