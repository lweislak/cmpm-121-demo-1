import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create button (Step 1)
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji

//Increment (Step 2)
let counter: number = 0;
button.addEventListener("click", function() {
    counter += 1;
    button.innerText = `🧂 Shaken ${counter} Times`;
});