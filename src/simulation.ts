import SlotMachineConfig from "./config/index";
import SlotMachine from "./services/slotMachine";

export const slotMachine = new SlotMachine(SlotMachineConfig);

console.time("Time to complete spins");
slotMachine.spin(1000);
console.log("*********************");
console.timeEnd("Time to complete spins");
console.log("*********************");
