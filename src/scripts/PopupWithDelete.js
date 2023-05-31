import Popup from "./Popup.js";

class PopupWithDelete extends Popup {
  constructor(popup, { handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._setEvent = this._setEvent.bind(this);
  }

  handleSubmitConfirm(submitConfirm) {
    this._handleSubmit = submitConfirm;
  }

  _setEvent(evt) {
    evt.preventDefault();
    this._handleSubmit();
  }

  open() {
    super.open();
    this._popup.addEventListener('submit', this._setEvent);
  }

  close() {
    super.close();
    this._popup.removeEventListener('submit', this._setEvent);
  }
}

export default PopupWithDelete;