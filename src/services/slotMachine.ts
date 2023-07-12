import { SlotMachineConfigType } from "../types/SlotMachineConfigType";

export default class SlotMachine {
  slotMachine;
  constructor(slotMachineConfig: SlotMachineConfigType) {
    this.slotMachine = slotMachineConfig;
  }
  spin() {
    console.log(this.slotMachine.lines);
  }
}
