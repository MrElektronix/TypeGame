class TypeGame {
  constructor() {

  }



  checkWord(textfield, word) {
    if (textfield.value === word) {
      return true;
    }
  }

  clearTextField(textfield) {
    textfield.value = "";
  }


}
