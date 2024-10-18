import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saltiness Level";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Declare variables
const numberOfClicks = [0, 0, 0];
const cost = [10, 100, 1000];

//Create Main Button (Step 1)
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji

//Create Cost 10 Upgrade Button (Step 5)
const upgrade10 = document.createElement("button");
upgrade10.innerText = `Play a match of Overwatch\nCost: ${cost[0]}`;
setupButton(upgrade10, "translateX(65%)");

//Create Cost 100 Upgrade Button (Step 6)
const upgrade100 = document.createElement("button");
upgrade100.innerText = `Play a match of Valorant\nCost: ${cost[1]}`;
setupButton(upgrade100, "translateX(-170%)");

//Create Cost 1,000 Upgrade Button (Step 6)
const upgrade1k = document.createElement("button");
upgrade1k.innerText = `Play a match of League of Legends\nCost: ${cost[2]}`;
setupButton(upgrade1k, "translateY(200%)");

//Increment Counter (Step 2)
let counter: number = 1000.0;
button.addEventListener("click", function () {
  counter += 1.0;
  updateButton();
});

//If button is shown, check for a click
//TODO: Condense into function
upgrade10.addEventListener("click", function () {
  requestAnimationFrame(step.bind(performance.now()));
  counter -= 10.0;
  numberOfClicks[0]++;
  cost[0] *= 1.15; //Increase cost for upgrade
  upgrade10.innerText = `Play a match of Overwatch\nCost: ${roundHundredths(cost[0])}`;
  updateButton();
});
upgrade100.addEventListener("click", function () {
  //Change growth rate. This is janky
  for (let i = 0; i < 100; i++) {
    requestAnimationFrame(step.bind(performance.now()));
  }
  counter -= 100.0;
  numberOfClicks[1]++;
  cost[1] *= 1.15;
  upgrade100.innerText = `Play a match of Valorant\nCost: ${roundHundredths(cost[1])}`;
  updateButton();
});
upgrade1k.addEventListener("click", function () {
  //Change growth rate. This is janky
  for (let i = 0; i < 1000; i++) {
    requestAnimationFrame(step.bind(performance.now()));
  }
  counter -= 1000.0;
  numberOfClicks[2]++;
  cost[2] *= 1.15;
  upgrade1k.innerText = `Play a match of League of Legends\nCost: ${roundHundredths(cost[2])}`;
  updateButton();
});

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
    upgrade.disabled = false; //Show button if counter is over 10
  } else {
    upgrade.disabled = true;
  }
}

//Helper function that updates the main button text
function updateButton() {
  button.innerText = `🧂 Levels Increased By x ${roundHundredths(counter)}`;
  checkUpgradeButton(upgrade10, cost[0]);
  checkUpgradeButton(upgrade100, cost[1]);
  checkUpgradeButton(upgrade1k, cost[2]);
}

//Function that starts gradual growth of the counter value
function step(prevTime: number) {
  const currTime = performance.now();
  const seconds = (currTime - prevTime) / 1000; //Convert from milliseconds to seconds

  counter += seconds;
  updateButton();

  requestAnimationFrame(step.bind(currTime));
}
