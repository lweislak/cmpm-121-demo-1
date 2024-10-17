import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saltiness Level";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create Main Button (Step 1)
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji


//Create Cost 10 Upgrade Button (Step 5)
const upgrade10 = document.createElement("button");
upgrade10.innerText = "Play a match of Overwatch\nCost: 10";
setupButton(upgrade10, "translateX(65%)");

//Create Cost 100 Upgrade Button (Step 6)
const upgrade100 = document.createElement("button");
upgrade100.innerText = "Play a match of Valorant\nCost: 100";
setupButton(upgrade100, "translateX(-170%)");

//Create Cost 1,000 Upgrade Button (Step 6)
const upgrade1k = document.createElement("button");
upgrade1k.innerText = "Play a match of League of Legends\nCost: 1,000";
setupButton(upgrade1k, "translateY(200%)");

//Increment Counter (Step 2)
let counter: number = 0.0;
button.addEventListener("click", function () {
  counter += 1.0;
  updateButton();
});

//If button is shown, check for a click
upgrade10.addEventListener("click", function () {
  requestAnimationFrame(step.bind(performance.now()));
  counter -= 10.0;
  updateButton();
});


//Function to setup button with specific parameters
function setupButton(upgrade: HTMLButtonElement, translateXPercent: string) {
  upgrade.style.position = "absolute";
  upgrade.style.left = "50%";
  upgrade.style.transform = translateXPercent;
  app.append(upgrade);
  upgrade.disabled = true; //Start with button disabled
}

//Function to check if upgrade button has been clicked
function checkUpgradeButton() {
  if (counter >= 10.0) {
    upgrade10.disabled = false; //Show button if counter is over 10
  } else {
    upgrade10.disabled = true;
  }
}

//Helper function that updates the button text
function updateButton() {
  //Code for rounding decimal places found at: https://stackoverflow.com/a/5623156
  const count = counter.toFixed(2).replace(/\.00$/, ""); //Rounds to the hundredths place
  button.innerText = `🧂 Levels Increased By x ${count}`;
  checkUpgradeButton();
}

//Function that starts gradual growth of the counter value
function step(prevTime: number) {
  const currTime = performance.now();
  const seconds = (currTime - prevTime) / 1000; //Convert from milliseconds to seconds

  counter += seconds;
  updateButton();

  requestAnimationFrame(step.bind(currTime));
}
