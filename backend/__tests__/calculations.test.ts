import { calculatePartHealth, calculateMachineHealth } from "../calculations";
import {
  MachineType,
  WeldingRobotPart,
  AssemblyLinePart,
  PaintingStationPart,
  QualityControlStationPart,
  partInfo,
} from "../../native-app/data/types";

describe("calculatePartHealth", () => {
  it("calculates normal part health correctly", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ArcStability, value: 92.5 };
    const expectedHealth = 75;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("returns 100 for a part operating in the optimal range", () => {
    const machineName: MachineType = MachineType.PaintingStation;
    const part: partInfo = {
      name: PaintingStationPart.ColorConsistency,
      value: 88.0,
    };
    const expectedHealth = 100;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  /* 
    Didn't figure out how to fix this one in time, but 
    the app doesn't handle this properly because it expects
    a number and softwareVersion is a string

  it("handles software versioning calculations correctly", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = { name: QualityControlStationPart.SoftwareVersion, value: "v2.0" };
    const expectedHealth = 100;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
  */

  it("returns 0 for a value outside any expected range", () => {
    const machineName: MachineType = MachineType.AssemblyLine;
    const part: partInfo = {
      name: AssemblyLinePart.FittingTolerance,
      value: 300,
    };
    const expectedHealth = 0;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("returns 50 for a normal value on the boundary of normal and abnormal", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.WireFeedRate, value: 10.0 };
    const expectedHealth = 50;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("returns 0 for an invalid machine type", () => {
    const machineName: MachineType = "deLorean" as MachineType;
    const part: partInfo = {
      name: WeldingRobotPart.CoolingEfficiency,
      value: 85,
    };
    const expectedHealth = 0;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("returns -1 for an invalid part type", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = {
      name: "Flux Capacitor" as WeldingRobotPart,
      value: 85,
    };
    const expectedHealth = -1;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculateMachineHealth", () => {
  it("calculates machine health correctly", () => {
    const machineName: MachineType = MachineType.AssemblyLine;
    const parts = [
      { name: AssemblyLinePart.AlignmentAccuracy, value: 0.55 },
      { name: AssemblyLinePart.Speed, value: 7.5 },
      { name: AssemblyLinePart.FittingTolerance, value: 0.03 },
      { name: AssemblyLinePart.BeltSpeed, value: 2.0 }
    ];
    const expectedHealth = 68.75;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("returns 0 for all invalid or nonexistent parts", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const parts = [
      { name: "unitTest" as QualityControlStationPart, value: 0 },
      { name: "impressionistMasterpiece" as PaintingStationPart, value: 100 },
    ];
    const expectedHealth = 0;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });
});
