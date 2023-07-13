import SlotMachineConfig from "./config/index";
import SlotMachine from "./services/slotMachine";

const prompt = require("prompt-sync")({ sigint: true });

export const slotMachine = new SlotMachine(SlotMachineConfig);

// Please provide your number of spins to the spin method
while (true) {
  const numberOfSpins = prompt("Number of spins: ");
  if (isNaN(numberOfSpins) || numberOfSpins === 0) {
    console.log("Please enter a valid number of spins!");
  } else {
    console.time("Time to complete spins");
    slotMachine.spin(numberOfSpins);
    console.log("*********************");
    console.timeEnd("Time to complete spins");
    console.log("*********************");
  }
}
