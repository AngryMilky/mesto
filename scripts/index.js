import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseProf = document.querySelector('.button-close-profile');
const buttonCloseElm = document.querySelector('.button-close-element');
const buttonCloseImg = document.querySelector('.button-close-image');
const buttonAdd = document.querySelector('.profile__button-add');

const cards = document.querySelector('.elements');

const popupPhoto = document.querySelector('.popup__photo');
const popupCaption = document.querySelector('.popup__caption');

const formImg = document.querySelector('.popup_content_image');
const formEdit = document.querySelector('.popup_content_profile');
const formAdd = document.querySelector('.popup_content_element');

const formProfileEdit = document.querySelector('#Profile_Edit');
const formPlaceAdd = document.querySelector('#Place_Add');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const nameText = document.querySelector('#name')
const jobText = document.querySelector('#job')

const nameImg = document.querySelector('#img-name');
const linkImg = document.querySelector('#link');

const formValidationOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  disabledButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

const initialCards = [
  {
    name: 'Республика Коми',
    link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1632503393918-d458cda50f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Озеро Байкал',
    link: 'https://images.unsplash.com/photo-1587053362230-eb9a377641ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Курильские острова',
    link: 'https://images.unsplash.com/photo-1647391342641-f18cf2994f73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://plus.unsplash.com/premium_photo-1668260981191-27d7630c6ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

const profileValidator = new FormValidator(formValidationOptions, formProfileEdit);
const addCardValidator = new FormValidator(formValidationOptions, formPlaceAdd);
profileValidator.enableValidation();
addCardValidator.enableValidation();


// загрузить массив на страницу

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, '#card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);

});


// добавление карточки

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCard = new Card(`${nameImg.value}`, `${linkImg.value}`, '#card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = newCard.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').prepend(cardElement);
  evt.target.reset();
  closePopup(formAdd);
}


// просмотреть фото

cards.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__photo')) {
    openPopup(formImg);
    popupPhoto.src = evt.target.src;
    popupCaption.textContent = evt.target.closest('.element').querySelector('.element__captiontext').textContent;
    popupPhoto.alt = evt.target.alt;

  }
});

//  закрывает Попап

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);

}


// закрывает Попап нажатием Esc

function closeByEsc(evt) {
  if (evt.key == 'Escape') {
    closePopup(document.querySelector('.popup_opened'));

  }
}


// закрытие кликом по оверлей

window.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
});


// открывает Попап 

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);

}


buttonEdit.addEventListener('click', function () {
  openPopup(formEdit);
  nameText.value = name.textContent;
  jobText.value = job.textContent;

});



buttonAdd.addEventListener('click', function () {
  openPopup(formAdd);
  addCardValidator.enableValidation();
 
});


// отправка и сохранение формы Редактирования информации в профиле

function handleFormSubmit(evt) {
  evt.preventDefault();
  job.textContent = jobText.value;
  name.textContent = nameText.value;
  closePopup(formEdit);

}


formProfileEdit.addEventListener('submit', handleFormSubmit);

buttonCloseElm.addEventListener('click', function () {
  closePopup(formAdd);
});

buttonCloseProf.addEventListener('click', function () {
  closePopup(formEdit);
});


buttonCloseImg.addEventListener('click', function () {
  closePopup(formImg);
});

formPlaceAdd.addEventListener('submit', handleFormSubmitAdd);
