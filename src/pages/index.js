import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";

import '../pages/index.css';

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseProf = document.querySelector('.button-close-profile');
const buttonCloseElm = document.querySelector('.button-close-element');
const buttonCloseImg = document.querySelector('.button-close-image');
const buttonAdd = document.querySelector('.profile__button-add');

const cards = document.querySelector('.elements');

const formImg = document.querySelector('.popup_content_image');
const formEdit = document.querySelector('.popup_content_profile');
const formAdd = document.querySelector('.popup_content_element');

const formProfileEdit = document.querySelector('#Profile_Edit');
const formPlaceAdd = document.querySelector('#Place_Add');

const nameText = document.querySelector('#name')
const jobText = document.querySelector('#job')

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


function createCard(data, templateSelector) {
  const card = new Card(data.name, data.link, templateSelector, {
    handleCardClick: () => {
      popupOpenPhoto.open(data.name, data.link);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}


//Экземпляр профиля
const profile = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__job'
});

// загрузить массив на страницу
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
   const card = createCard(item, '#card-template');
   cardsList.addItem(card);
        
  },
},
  cards
);

// отрисовка карточек
cardsList.renderItems();


//Попап просмотра фото
const popupOpenPhoto = new PopupWithImage(formImg);
popupOpenPhoto.setEventListeners();


//Форма Редактирования информации в профиле
const popupEditProfile = new PopupWithForm({
  popup: formEdit,
  //отправка и сохранение формы Редактирования информации в профиле
  handleFormSubmit: (userData) => {
    profile.setUserInfo(userData);
    popupEditProfile.close();
  }
});

popupEditProfile.setEventListeners();

buttonEdit.addEventListener('click', function () {
  popupEditProfile.open();
  const userData = profile.getUserInfo();
  nameText.value = userData.userName;;
  jobText.value = userData.userInfo;

});


//Форма Добавление карточки
const popupAddCard = new PopupWithForm({
  popup: formAdd,
  handleFormSubmit: (data) => {
    const card = createCard(data, '#card-template');
    cardsList.addItem(card);
    popupAddCard.close();
  }
});

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', function () {
  popupAddCard.open();
  addCardValidator.toggleButton();
});

