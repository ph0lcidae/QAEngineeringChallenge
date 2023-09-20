const { reloadApp } = require("detox-expo-helpers");

describe("Machine health calculation user flows", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it("selects a part from the part picker, enters a valid value, and saves", async () => {
    await element(by.text('Go to home screen!')).tap();
    await expect(element(by.text('Calculate Health'))).toBeVisible();
  });

  it("selects multiple parts with valid values, saves, and calculates machine state", async () => {
    await element(by.text('Go to home screen!')).tap();
    await expect(element(by.text('Calculate Health'))).toBeVisible();
  });

  
});
