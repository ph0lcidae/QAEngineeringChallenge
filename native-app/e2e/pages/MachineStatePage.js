import { BasePage } from "./BasePage";
import TestConstants from "../constants/TestConstants";

export class MachineStatePage extends BasePage {
  constructor() {
    super();
  }

  async calculateHealth() {
    await element(by.id(TestConstants.CALCULATE_HEALTH_BUTTON)).tap();
  }

  async resetMachineData() {
    await element(by.id(TestConstants.RESET_MACHINE_DATA)).tap();
  }
}
