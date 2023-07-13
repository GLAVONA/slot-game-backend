import SlotMachineConfig from "./config/index";
import SlotMachine from "./services/slotMachine";

export const slotMachine = new SlotMachine(SlotMachineConfig);

// Please provide your number of spins to the spin method
slotMachine.spin(1);
