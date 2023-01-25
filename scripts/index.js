
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__button-close');
let classes = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

let NameText = document.getElementById('name')
let JobText = document.getElementById('job')


// открывает popup

function openPopup() {
  classes.classList.add('popup_opened');
  NameText.value = name.textContent;
  JobText.value = job.textContent;
}




//  закрывает popup

function closePopup() {
  classes.classList.remove('popup_opened');

}




// отправка и сохранение формы

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  job.textContent = `${JobText.value}`;
  name.textContent = `${NameText.value}`;

  closePopup();

}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

