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
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  // удалить карточку
  _deleteCard = () => {
    this._element.remove();
  }

  
  _setEventListeners = () => {
    this._element.querySelector('.element__button-delete').addEventListener('click', this._deleteCard);
    this._buttonLike.addEventListener('click', this._addLike);
   
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');
    this._buttonLike = this._element.querySelector('.element__button-like');
    
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.element__captiontext').textContent = this._name;
    this._cardImage.alt = this._name;
    
    return this._element;

  }
}

export default Card;