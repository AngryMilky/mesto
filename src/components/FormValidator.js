class FormValidator {
  constructor(formValidationOptions, formElement) {
    this._formElement = formElement;
    this._inputSelector = formValidationOptions.inputSelector;
    this._submitButtonSelector = formValidationOptions.submitButtonSelector;
    this._disabledButtonClass = formValidationOptions.disabledButtonClass;
    this._inputErrorClass = formValidationOptions.inputErrorClass;
    this._errorClass = formValidationOptions.errorClass;
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }


  //  включение валидации всех форм

  enableValidation() {
    
    this._setEventListeners();
    this.toggleButton();

  };


  // проверка инпутов на валидность

  _checkInputValidity(inputElement) {

    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    if (inputElement.validity.valid) {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    }
    else {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    }
  }

  
  // поиск активного поля  

  _setEventListeners() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this.toggleButton();
      });
    });

  }

  // деактивация и активация кнопки

  toggleButton() {

    const isFormValid = this._formElement.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._disabledButtonClass, !isFormValid);
  }
}

export default FormValidator;
