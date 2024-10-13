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

//Helper function that updates the button text
function updateButton() {
  button.innerText = `🧂 Levels Increased By x ${counter}`;
}

//Increment Counter (Step 2)
let counter: number = 0;
button.addEventListener("click", function () {
  counter += 1;
  updateButton();
});

//Automatic Clicking (Step 3)
const intervalID: number = window.setInterval(() => {
  counter += 1;
  updateButton();
}, 1000);
