class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  // поставить лайк
  _addLike = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  // удалить карточку
  _deleteCard = () => {
    this._element.remove();
  }

  
  _setEventListeners = () => {
    this._element.querySelector('.element__button-delete').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element__button-like').addEventListener('click', this._addLike);
   
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__captiontext').textContent = this._name;
    this._element.querySelector('.element__photo').alt = this._name;
    
    return this._element;

  }
}

export default Card;