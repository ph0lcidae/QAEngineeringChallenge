import { LogPartPage } from "./pages/LogPartPage";
import { MachineStatePage } from "./pages/MachineStatePage";
import TestConstants from "./constants/TestConstants";
const { reloadApp } = require("detox-expo-helpers");
const logPartPage = new LogPartPage();
const machineStatePage = new MachineStatePage();

describe("Machine health calculation user flows", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp();
    await machineStatePage.goToHomeScreen();
  });

  afterEach(async () => {
    await machineStatePage.resetMachineData();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it("selects a part from the part picker, enters a valid value, and saves", async () => {
    await machineStatePage.switchPage(TestConstants.LOG_PART_NAV_BUTTON);
    await logPartPage.logPart(
      TestConstants.WELDING_ROBOT,
      TestConstants.SEAM_WIDTH,
      "2"
    );
    await expect(
      element(by.text(TestConstants.SAVED_CONFIRM_MSG))
    ).toBeVisible();

    await logPartPage.switchPage(TestConstants.MACHINE_STATE_NAV_BUTTON);

    // machine part names are in camelCase on machine state page
    await expect(element(by.id(TestConstants.WELDING_ROBOT))).toBeVisible();
    await expect(
      element(
        by.text(machineStatePage.camelCase(TestConstants.SEAM_WIDTH) + ": 2")
      )
    ).toBeVisible();
  });

  it("selects multiple parts with valid values, saves, and calculates machine state", async () => {
    await machineStatePage.switchPage(TestConstants.LOG_PART_NAV_BUTTON);
    await logPartPage.logPart(
      TestConstants.WELDING_ROBOT,
      TestConstants.ELECTRODE_WEAR,
      "0.5"
    );
    // wait until we see the confirm message before adding the next part
    await expect(
      element(by.text(TestConstants.SAVED_CONFIRM_MSG))
    ).toBeVisible();

    await logPartPage.logPart(
      TestConstants.QUALITY_CONTROL,
      TestConstants.CAMERA_CALIBRATION,
      "0.5"
    );
    await expect(
      element(by.text(TestConstants.SAVED_CONFIRM_MSG))
    ).toBeVisible();

    await logPartPage.logPart(
      TestConstants.ASSEMBLY_LINE,
      TestConstants.ALIGNMENT_ACCURACY,
      "0.5"
    );
    await expect(
      element(by.text(TestConstants.SAVED_CONFIRM_MSG))
    ).toBeVisible();

    await logPartPage.logPart(
      TestConstants.PAINTING_STATION,
      TestConstants.COLOR_CONSISTENCY,
      "92"
    );
    await expect(
      element(by.text(TestConstants.SAVED_CONFIRM_MSG))
    ).toBeVisible();

    await logPartPage.switchPage(TestConstants.MACHINE_STATE_NAV_BUTTON);

    // verify that all the right values are there before we calculate
    await expect(element(by.id(TestConstants.WELDING_ROBOT))).toBeVisible();
    await expect(
      element(
        by.text(
          machineStatePage.camelCase(TestConstants.ELECTRODE_WEAR) + ": 0.5"
        )
      )
    ).toBeVisible();

    await expect(element(by.id(TestConstants.QUALITY_CONTROL))).toBeVisible();
    await expect(
      element(
        by.text(
          machineStatePage.camelCase(TestConstants.CAMERA_CALIBRATION) + ": 0.5"
        )
      )
    ).toBeVisible();

    await expect(element(by.id(TestConstants.ASSEMBLY_LINE))).toBeVisible();
    await expect(
      element(
        by.text(
          machineStatePage.camelCase(TestConstants.ALIGNMENT_ACCURACY) + ": 0.5"
        )
      )
    ).toBeVisible();

    await expect(element(by.id(TestConstants.PAINTING_STATION))).toBeVisible();
    await expect(
      element(
        by.text(
          machineStatePage.camelCase(TestConstants.COLOR_CONSISTENCY) + ": 92"
        )
      )
    ).toBeVisible();

    await expect(
      element(by.text(TestConstants.FACTORY_HEALTH_SCORE_HEADER))
    ).toBeVisible();
    await expect(
      element(by.text(TestConstants.FACTORY_HEALTH_SCORE_ABSENT_MSG))
    ).toBeVisible();

    // calculate and verify
    await machineStatePage.calculateHealth();
    await expect(
      element(by.text(TestConstants.FACTORY_HEALTH_SCORE_ABSENT_MSG))
    ).not.toBeVisible();

    // factory health score aggregate and individual machine scores (TODO: fix magic numbers)
    await expect(element(by.text("72.36"))).toBeVisible();
    await expect(
      element(by.text(TestConstants.WELDING_ROBOT + ": 72.22"))
    ).toBeVisible();
    await expect(
      element(by.text(TestConstants.PAINTING_STATION + ": 70.00"))
    ).toBeVisible();
    await expect(
      element(by.text(TestConstants.ASSEMBLY_LINE + ": 72.22"))
    ).toBeVisible();
    await expect(
      element(by.text(TestConstants.QUALITY_CONTROL + ": 75.00"))
    ).toBeVisible();
  });
});
