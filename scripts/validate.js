const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  disabledButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};


//  включение валидации всех форм

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    form.addEventListener('input', function () {
      toggleButton(form, options);

    });

    addInputListners(form, options);
    toggleButton(form, options);

  });
};


// проверка инпутов на валидность

function checkInputValidity(event, options) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(options.inputErrorClass);
    errorElement.textContent = '';
  }
  else {
    input.classList.add(options.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

// деактивация и активация кнопки

function toggleButton(form, options) {
  const buttonSubmit = form.querySelector(options.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(options.disabledButtonClass, !isFormValid);

}

// поиск активного поля  

function addInputListners(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', function (event) {
      checkInputValidity(event, options);
    });
  });
}


enableValidation(formValidationOptions);