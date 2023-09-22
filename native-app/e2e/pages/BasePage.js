import TestConstants from "../constants/TestConstants";

export class BasePage {
  constructor() {}

  async goToHomeScreen() {
    // TODO: fix this hack, reloadApp() navigates to a nonexistent page somehow
    await element(by.text("Go to home screen!")).tap();
  }

  async switchPage(tabId) {
    await element(by.id(tabId)).tap();
  }

  // borrowed from https://www.geeksforgeeks.org/how-to-convert-string-to-camel-case-in-javascript/
  // a little abstract but avoids duplicate constants with different case
  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }
}
