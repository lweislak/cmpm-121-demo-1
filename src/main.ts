import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saltiness Level";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create main button (Step 1)
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji

//Create upgrade buttons
const Overwatch = document.createElement("button");
Overwatch.innerText = `Play a match of Overwatch\nCost: 10`;
setupButton(Overwatch, "translateX(65%)"); //Move button

const Valorant = document.createElement("button");
Valorant.innerText = `Play a match of Valorant\nCost: 100`;
setupButton(Valorant, "translateX(-170%)"); //Move button

const LoL = document.createElement("button");
LoL.innerText = `Play a match of League of Legends\nCost: 1000`;
setupButton(LoL, "translateY(200%)"); //Move button

interface Item {
  name: string;
  button: HTMLButtonElement;
  cost: number;
  rate: number;
  clicks: number;
}

const avaliableItems: Item[] = [
  { name: "Overwatch", button: Overwatch, cost: 10, rate: 0.1, clicks: 0 },
  { name: "Valorant", button: Valorant, cost: 100, rate: 2.0, clicks: 0 },
  { name: "League of Legends", button: LoL, cost: 1000, rate: 50, clicks: 0 },
];

//Increment button counter
let counter: number = 0.0;
button.addEventListener("click", function () {
  counter += 1.0;
  updateButton();
});

//Setup event listener that checks for a click if button is active
for (const item of avaliableItems) {
  item.button.addEventListener("click", function () {
    requestAnimationFrame(step.bind(performance.now()));
    counter -= item.cost;
    item.cost *= 1.15;
    item.button.innerText = `Play a match of ${item.name}\nCost: ${roundHundredths(item.cost)}`;
    updateButton();
  });
}

//Helper function to round numbers to hundredths place and return string
//Code for rounding decimal places found at: https://stackoverflow.com/a/5623156
function roundHundredths(value: number) {
  return value.toFixed(2).replace(/\.00$/, ""); //Rounds to the hundredths place
}

//Function to setup button with specific parameters
function setupButton(upgrade: HTMLButtonElement, translateXPercent: string) {
  upgrade.style.position = "absolute";
  upgrade.style.left = "50%";
  upgrade.style.transform = translateXPercent;
  app.append(upgrade);
  upgrade.disabled = true; //Start with button disabled
}

//Function to check if upgrade button has been clicked
function checkUpgradeButton(upgrade: HTMLButtonElement, amount: number) {
  if (counter >= amount) {
    upgrade.disabled = false; //Show button if counter is over min amount
  } else {
    upgrade.disabled = true;
  }
}

//Helper function that updates the button
function updateButton() {
  button.innerText = `🧂 Levels Increased By x ${roundHundredths(counter)}`;
  for (const item of avaliableItems) {
    checkUpgradeButton(item.button, item.cost);
  }
}

//Function that starts gradual growth of the counter value
function step(prevTime: number) {
  const currTime = performance.now();
  const seconds = (currTime - prevTime) / 1000; //Convert from milliseconds to seconds

  counter += seconds;
  updateButton();

  requestAnimationFrame(step.bind(currTime));
}
