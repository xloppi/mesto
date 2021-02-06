function toggleButtonState (inputList, buttonElement, settingObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingObject.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settingObject.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}


const showInputError = (formElement, inputElement, errorMessage, settingObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingObject.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settingObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingObject.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingObject);
  } else {
    hideInputError(formElement, inputElement, settingObject);
  }
}

const setEventListeners = (formElement, settingObject) => {
  const inputList = Array.from(formElement.querySelectorAll(settingObject.inputSelector));
  const buttonElement = formElement.querySelector(settingObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingObject);
      toggleButtonState(inputList, buttonElement, settingObject);
    });
  });
}

const enableValidation = (settingObject) => {

  const formList = Array.from(document.querySelectorAll(settingObject.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
      setEventListeners(formElement, settingObject);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
