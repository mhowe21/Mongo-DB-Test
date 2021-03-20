class Validator {
  constructor() {}

  emailValidator(inputEmail) {
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputEmail.match(emailFormat)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Validator;
