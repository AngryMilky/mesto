class Card {
  constructor(data, userId, templateSelector, { handleDeleteClick, handleCardClick, handleLikeCard }) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  _checkOwnLike() {
    this.isLiked() ? this.addLike() : this.deleteLike();
  }

  countLike(data) {
    this._likes = data;
    this._likesCount.textContent = this._likes.length;
  }


  // поставить лайк
  addLike = () => {
    this._buttonLike.classList.add('element__button-like_active');
  }

  // удалить карточку
  deleteLike = () => {
    this._buttonLike.classList.remove('element__button-like_active');
  }


  // удалить карточку
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }


  _setEventListeners = () => {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._handleDeleteClick()
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  generateCard() {

    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__photo');
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._likesCount = this._element.querySelector('.element__like-count');
    this._buttonDelete = this._element.querySelector('.element__button-delete');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.element__captiontext').textContent = this._name;
    this._cardImage.alt = this._name;

    this._checkOwnLike();

    this.countLike(this._likes);

    this._hideButtonDelete();

    return this._element;
  }

  _hideButtonDelete() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }
  }
}

export default Card;