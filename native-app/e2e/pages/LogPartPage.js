import { BasePage } from "./BasePage";
import TestConstants from "../constants/TestConstants";

export class LogPartPage extends BasePage {
  constructor() {
    super();
  }

  async selectMachineName(name, column = 0, idx = 0) {
    await element(by.id("ios_touchable_wrapper")).atIndex(idx).tap();
    await element(by.id("ios_picker")).setColumnToValue(column, name);
    await element(by.id("done_button")).tap();
  }

  async selectPartName(name, column = 0, idx = 1) {
    await element(by.id("ios_touchable_wrapper")).atIndex(idx).tap();
    await element(by.id("ios_picker")).setColumnToValue(column, name);
    await element(by.id("done_button")).tap();
  }

  async setPartValue(value) {
    await element(by.id(TestConstants.PART_VALUE_INPUT)).clearText();
    await element(by.id(TestConstants.PART_VALUE_INPUT)).typeText(value);
  }

  async saveValues() {
    await element(by.id(TestConstants.SAVE_PART_BUTTON)).tap();
  }

  async logPart(machine, part, value) {
    await this.selectMachineName(machine);
    await this.selectPartName(part);
    await this.setPartValue(value);
    await this.saveValues();
  }
}
