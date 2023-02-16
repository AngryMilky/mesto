const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseProf = document.querySelector('.button-close-profile');
const buttonCloseElm = document.querySelector('.button-close-element');
const buttonCloseImg = document.querySelector('.button-close-image');
const buttonAdd = document.querySelector('.profile__button-add');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const popupPhoto = document.querySelector('.popup__photo');
const popupCaption = document.querySelector('.popup__caption');


const formEdit = document.querySelector('.popup_content_profile');
const formAdd = document.querySelector('.popup_content_element');
const formImg = document.querySelector('.popup_content_image');

const formProfileEdit = document.querySelector('#Profile_Edit');
const formPlaceAdd = document.querySelector('#Place_Add');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const nameText = document.querySelector('#name')
const jobText = document.querySelector('#job')

const nameImg = document.querySelector('#img-name');
const linkImg = document.querySelector('#link');




// создание карточки

function createCard(nameCard, linkCard) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

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

  evt.target.reset();
  closePopup(formAdd);
}


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
    closePopup(document.querySelector('.popup_opened'));
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
  
const createButton = formAdd.querySelector('.popup__button-save');
if ( nameImg.textContent.length === 0 && linkImg.textContent.length === 0 ) {
  createButton.setAttribute('disabled', '');
  createButton.classList.add('popup__button-save_disabled');
}

});



// отправка и сохранение формы Редактирования информации в профиле

function handleFormSubmit(evt) {
  evt.preventDefault();
  job.textContent = `${jobText.value}`;
  name.textContent = `${nameText.value}`;
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
