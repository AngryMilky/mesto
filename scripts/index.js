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

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseProf = document.querySelector('.button-close-profile');
const buttonCloseElm = document.querySelector('.button-close-element');
const buttonCloseImg = document.querySelector('.button-close-image');
const buttonAdd = document.querySelector('.profile__button-add');


const cards = document.querySelector('.elements');

const formEdit = document.querySelector('.popup_content_profile');
const formAdd = document.querySelector('.popup_content_element');

const formImg = document.querySelector('.popup_content_image');
const formProfileEdit = document.getElementById('Profile_Edit');
const formPlaceAdd = document.getElementById('Place_Add');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const nameText = document.getElementById('name')
const jobText = document.getElementById('job')

const nameImg = document.getElementById('img-name');
const linkImg = document.getElementById('link');




// создание карточки

function createCard(nameCard, linkCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const popupPhoto = document.querySelector('.popup__photo');
  const popupCaption = document.querySelector('.popup__caption');

  cardElement.querySelector('.element__photo').src = linkCard;
  cardElement.querySelector('.element__captiontext').textContent = nameCard;
  cardElement.querySelector('.element__photo').alt = nameCard;


  // поставить лайк

  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });

  // удалить карточку

  cardElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
    const element = evt.target.closest('.element');
    element.remove();
  });

  // просмотреть фото

  cardElement.querySelector('.element__photo').addEventListener('click', function (evt) {
    openPopup(formImg);
    popupPhoto.src = evt.target.closest('.element__photo').src;
    popupCaption.textContent = evt.target.closest('.element').querySelector('.element__captiontext').textContent;
    popupPhoto.alt = evt.target.closest('.element__photo').alt;
  });

  return cardElement;
}



// добавление карточки в контейнер 

function renderCard(card, container) {
  container.prepend(card);
}






// загрузить готовый массив на страницу

function addCardstoTemplate(allPhoto) {
  for (let i = 0; i < allPhoto.length; i++) {
    const newCard = createCard(initialCards[i].name, initialCards[i].link);
    renderCard(newCard, cards);
  }

}

addCardstoTemplate(initialCards);


// добавление карточки

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const newCard = createCard(`${nameImg.value}`, `${linkImg.value}`);
  renderCard(newCard, cards);

  linkImg.value = '';
  nameImg.value = '';
  closePopup(formAdd);


}


// открывает Попап 

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

}


buttonEdit.addEventListener('click', function () {
  openPopup(formEdit);
  nameText.value = name.textContent;
  jobText.value = job.textContent;

});


buttonAdd.addEventListener('click', function () {
  openPopup(formAdd);

});


//  закрывает Попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

}


// отправка и сохранение формы Редактирования информации в профиле

function handleFormSubmit(evt) {
  evt.preventDefault();
  job.textContent = `${jobText.value}`;
  name.textContent = `${nameText.value}`;
  closePopup(formEdit);;
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


