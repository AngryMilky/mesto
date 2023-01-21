// открыть редактор 
let editButton = document.querySelector('.profile__editbutton');
let classes = document.querySelector('.popup');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

function openPopup() {
  classes.classList.toggle('popup_opened');
  document.getElementById('openName').value = name.textContent;
  document.getElementById('openjob').value = job.textContent;
}

editButton.addEventListener('click', openPopup);


//  закрыть редактор

let closeButton = document.querySelector('.popup__closebutton');

function closePopup() {
  classes.classList.toggle('popup_opened');

}

closeButton.addEventListener('click', closePopup);


// отправка и сохранение формы

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__containerField-name');
let jobInput = document.querySelector('.popup__containerField-job');

function handleFormSubmit(evt) {
  evt.preventDefault();
  let newJob = document.querySelector('.profile__job');
  newJob.textContent = `${jobInput.value}`;
  let newName = document.querySelector('.profile__name');
  newName.textContent = `${nameInput.value}`;

  console.log('Форма отправлена');

  closePopup();

}

formElement.addEventListener('submit', handleFormSubmit);

