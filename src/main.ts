import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saltiness Level";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create Button (Step 1)
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji

//

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
}

requestAnimationFrame(step.bind(performance.now()));

function step(prevTime: number) {
  const currTime = performance.now();
  const seconds = (currTime - prevTime) / 1000; //Convert from milliseconds to seconds

  counter += seconds;
  updateButton();

  requestAnimationFrame(step.bind(currTime));
}
