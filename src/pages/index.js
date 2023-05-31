import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Api from "../components/Api.js";

import '../pages/index.css';

import {
  buttonEdit, buttonAdd, buttonAvatar, cards, formDelete,
  formAvatar, formImg, formEdit, formAdd, formProfileEdit,
  formPlaceAdd, formAvatarEdit, nameText, jobText,
  formValidationOptions
} from '../utils/constants.js';

// Создаем валидацию форм
const profileValidator = new FormValidator(formValidationOptions, formProfileEdit);
const addCardValidator = new FormValidator(formValidationOptions, formPlaceAdd);
const editAvatarValidator = new FormValidator(formValidationOptions, formAvatarEdit);
profileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7ec07678-8c6d-40ed-9548-222c1487bc48',
    'Content-Type': 'application/json'
  }
});

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    profile.setUserInfo(userData);
    profile.setUserAvatar(userData);
    userId = userData._id;

    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });


function createCard(data, templateSelector) {
  const card = new Card(data, userId, templateSelector, {
    handleDeleteClick: () => {
      popupDeletePhoto.open();
      popupDeletePhoto.handleSubmitConfirm(() => {
        api.deleteCard(card._id)
          .then(() => {
            card.deleteCard();
            popupDeletePhoto.close();
          })
          .catch((err) => {
            console.log(err);
          })
      });
    },
    handleCardClick: () => {
      popupOpenPhoto.open(data.name, data.link);
    },
    handleLikeCard: () => {
      if (card.isLiked()) {
        api.deleteLike(card._id)
          .then((data) => {
            card.deleteLike();
            card.countLike(data.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.setLike(card._id)
          .then((data) => {
            card.addLike();
            card.countLike(data.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}


//Экземпляр профиля
const profile = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__job',
  profileAvatar: '.profile__avatar'
});


// загрузить массив на страницу
const cardsList = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item, '#card-template');
    cardsList.addItem(card);
  },
},
  cards
);


//Попап просмотра фото
const popupOpenPhoto = new PopupWithImage(formImg);
popupOpenPhoto.setEventListeners();


//Попап удаления фото
const popupDeletePhoto = new PopupWithDelete(formDelete, {
  handleSubmit: (data) => {
    api.deleteCard(data)
      .then(() => {
        popupDeletePhoto.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

popupDeletePhoto.setEventListeners();



//Форма Редактирования информации в профиле
const popupEditProfile = new PopupWithForm({
  popup: formEdit,
  //отправка и сохранение формы Редактирования информации в профиле
  handleFormSubmit: (userData) => {
    popupEditProfile.renderSaving(true);
    api.editUserInfo(userData)
      .then((res) => {
        profile.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderSaving(false);
      })

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
    popupAddCard.renderSaving(true);
    api.addNewCard(data)
      .then((data) => {
        const card = createCard(data, '#card-template');
        cardsList.addItem(card);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderSaving(false);
      })
  }
});

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', function () {
  popupAddCard.open();
  addCardValidator.toggleButton();
});


//Форма Редактирования аватара
const popupEditAvatar = new PopupWithForm({
  popup: formAvatar,
  handleFormSubmit: (data) => {
    popupEditAvatar.renderSaving(true);
    api.editAvatar(data)
      .then((res) => {
        profile.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderSaving(false);
      })
  }
});

popupEditAvatar.setEventListeners();

buttonAvatar.addEventListener('click', function () {
  popupEditAvatar.open();
  editAvatarValidator.toggleButton();
});
