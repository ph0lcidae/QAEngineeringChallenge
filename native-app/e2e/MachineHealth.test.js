const { reloadApp } = require("detox-expo-helpers");

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadApp();
  });
});
