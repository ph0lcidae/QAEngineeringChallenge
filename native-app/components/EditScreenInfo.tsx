import React, { useCallback, useState } from "react";
import { Button, Platform, StyleSheet, TextInput } from "react-native";

import { Text, View } from "./Themed";
import { MachineType } from "../data/types";
import { useMachineData } from "../app/useMachineData";
import { useFocusEffect } from "expo-router";
import Picker from "./Picker";

export default function EditScreenInfo({ path }: { path: string }) {
  const [machineName, setMachineName] = useState("");
  const [partName, setPartName] = useState("");
  const [partValue, setPartValue] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { machineData, updateMachineData, loadMachineData } = useMachineData();

  const machineNames = [
    {
      label: "Welding Robot",
      value: MachineType.WeldingRobot,
      testID: "welding-robot-machine",
    },
    {
      label: "Painting Station",
      value: MachineType.PaintingStation,
      testID: "painting-station-machine",
    },
    {
      label: "Assembly Line",
      value: MachineType.AssemblyLine,
      testID: "assembly-line-machine",
    },
    {
      label: "Quality Control Station",
      value: MachineType.QualityControlStation,
      testID: "quality-control-station-machine",
    },
  ];

  const partNames = [
    {
      value: "arcStability",
      label: "Arc Stability",
      testID: "arc-stability-part",
    },
    {
      value: "coolingEfficiency",
      label: "Cooling Efficiency",
      testID: "cooling-efficiency-part",
    },
    {
      value: "electrodeWear",
      label: "Electrode Wear",
      testID: "electrode-wear-part",
    },
    { value: "seamWidth", label: "Seam Width", testID: "seam-width-part" },
    {
      value: "shieldingPressure",
      label: "Shielding Pressure",
      testID: "shielding-pressure-part",
    },
    {
      value: "vibrationLevel",
      label: "Vibration Level",
      testID: "vibration-level-part",
    },
    {
      value: "wireFeedRate",
      label: "Wire Feed Rate",
      testID: "wire-feed-rate-part",
    },
    {
      value: "colorConsistency",
      label: "Color Consistency",
      testID: "color-consistency-part",
    },
    { value: "flowRate", label: "Flow Rate", testID: "flow-rate-part" },
    {
      value: "nozzleCondition",
      label: "Nozzle Condition",
      testID: "nozzle-condition-part",
    },
    { value: "pressure", label: "Pressure", testID: "pressure-part" },
    {
      value: "alignmentAccuracy",
      label: "Alignment Accuracy",
      testID: "alignment-accuracy-part",
    },
    { value: "beltSpeed", label: "Belt Speed", testID: "belt-speed-part" },
    {
      value: "fittingTolerance",
      label: "Fitting Tolerance",
      testID: "fitting-tolerance-part",
    },
    { value: "speed", label: "Speed", testID: "speed-part" },
    {
      value: "cameraCalibration",
      label: "Camera Calibration",
      testID: "camera-calibration-part",
    },
    {
      value: "criteriaSettings",
      label: "Criteria Settings",
      testID: "criteria-settings-part",
    },
    {
      value: "lightIntensity",
      label: "Light Intensity",
      testID: "light-intensity-part",
    },
    {
      value: "softwareVersion",
      label: "Software Version",
      testID: "software-version-part",
    },
  ];

  const apiUrl: string = `http://${
    Platform?.OS === "android" ? "10.0.2.2" : "localhost"
  }:3001/machine-health`;

  const savePart = useCallback(async () => {
    try {
      const newMachineData = machineData
        ? JSON.parse(JSON.stringify(machineData))
        : { machines: {} }; // Deep copy machine parts

      if (!newMachineData.machines[machineName]) {
        newMachineData.machines[machineName] = {};
      }

      newMachineData.machines[machineName][partName] = partValue;

      await updateMachineData(newMachineData);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      throw error; // Handle API errors appropriately
    }
  }, [machineData, updateMachineData, machineName, partName, partValue]);

  //Doing this because we're not using central state like redux
  useFocusEffect(
    useCallback(() => {
      loadMachineData();
    }, [])
  );

  return (
    <View>
      <Text style={styles.label}>Machine Name</Text>
      <Picker
        value={machineName}
        onSetValue={setMachineName}
        items={machineNames}
      />

      <Text style={styles.label}>Part Name</Text>
      <Picker value={partName} onSetValue={setPartName} items={partNames} />

      <Text style={styles.label}>Part Value</Text>
      <TextInput
        style={styles.input}
        value={partValue}
        onChangeText={(text) => setPartValue(text)}
        placeholder="Enter part value"
        testID="part-value-input"
      />

      <Button title="Save" onPress={savePart} testID="save-part-button" />

      {isSaved && <Text style={styles.healthScore}>Saved ✔️</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  healthScore: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
