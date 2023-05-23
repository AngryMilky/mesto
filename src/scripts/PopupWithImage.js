import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupCaption.textContent = name;
  }

}

export default PopupWithImage;