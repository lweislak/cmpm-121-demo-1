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

//Create Upgrade Button (Step 5)
const upgrade = document.createElement("button");
upgrade.innerText = "Play a match of League of Legends";
upgrade.style.position = "absolute";
upgrade.style.left = "50%";
upgrade.style.transform = "translateX(50%)";
app.append(upgrade);
upgrade.disabled = true; //Start with button disabled

function checkUpgradeButton() {
  if (counter >= 10.0) {
    upgrade.disabled = false; //Show button if counter is over 10
  } else {
    upgrade.disabled = true;
  }
}

//If button is shown, check for a click
upgrade.addEventListener("click", function () {
  requestAnimationFrame(step.bind(performance.now()));
  counter -= 10.0;
  updateButton();
  console.log("Counter:", counter); //TEST
});

//Increment Counter (Step 2)
let counter: number = 0.0;
button.addEventListener("click", function () {
  counter += 1.0;
  updateButton();
});

//Helper function that updates the button text
function updateButton() {
  //Code for rounding decimal places found at: https://stackoverflow.com/a/5623156
  const count = counter.toFixed(2).replace(/\.00$/, ""); //Rounds to the hundredths place
  button.innerText = `🧂 Levels Increased By x ${count}`;
  checkUpgradeButton();
  console.log("TEST");
}

//Allows for gradual growth of the counter value
function step(prevTime: number) {
  const currTime = performance.now();
  const seconds = (currTime - prevTime) / 1000; //Convert from milliseconds to seconds

  counter += seconds;
  updateButton();

  requestAnimationFrame(step.bind(currTime));
}
