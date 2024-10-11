import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create button
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji
