import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saltiness Level";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Create seperate div elements for upgrade buttons
const upgrade1Div = document.createElement("div");
app.append(upgrade1Div);
const upgrade2Div = document.createElement("div");
app.append(upgrade2Div);

//Create main button
const button = document.createElement("button");
app.append(button);
button.innerText = "🧂"; //Salt shaker emoji

//Create upgrade buttons
const Overwatch = document.createElement("button");
Overwatch.innerText = `Play a match of Overwatch\nCost: 10`;
upgrade1Div.append(Overwatch);

const Valorant = document.createElement("button");
Valorant.innerText = `Play a match of Valorant\nCost: 100`;
upgrade1Div.append(Valorant);

const Apex = document.createElement("button");
Apex.innerText = `Play a match of Apex Legends\nCost: 500`;
upgrade2Div.append(Apex);

const Fortnite = document.createElement("button");
Fortnite.innerText = `Play a match of Fortnite\nCost: 1000`;
upgrade2Div.append(Fortnite);

const LoL = document.createElement("button");
LoL.innerText = `Play a match of League of Legends\nCost: 10000`;
upgrade2Div.append(LoL);

interface Item {
  name: string;
  button: HTMLButtonElement;
  cost: number;
  rate: number;
  clicks: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Overwatch",
    button: Overwatch,
    cost: 10,
    rate: 0.1,
    clicks: 0,
    description: "New skins are available for the low cost of $29.99!",
  },
  {
    name: "Valorant",
    button: Valorant,
    cost: 100,
    rate: 2.0,
    clicks: 0,
    description: "Another free to play hero shooter on the roster",
  },
  {
    name: "Apex Legends",
    button: Apex,
    cost: 500,
    rate: 35,
    clicks: 0,
    description: "Does anyone play this anymore?...Anyone?",
  },
  {
    name: "Fortnite",
    button: Fortnite,
    cost: 1000,
    rate: 50,
    clicks: 0,
    description: "Break your keyboard and yell at a child at the same time",
  },
  {
    name: "League of Legends",
    button: LoL,
    cost: 10000,
    rate: 500,
    clicks: 0,
    description: "Stop inting!",
  },
];

//Increment button counter
let counter: number = 0.0;
button.addEventListener("click", function () {
  counter += 1.0;
  updateButton();
});

for (const item of availableItems) {
  item.button.disabled = true; //Start with button disabled
  //Event listener that checks for a click if button is active
  item.button.addEventListener("click", function () {
    requestAnimationFrame(step.bind(performance.now()));
    counter -= item.cost;
    item.cost *= 1.15;
    item.button.innerText = `Play a match of ${item.name}\nCost: ${roundHundredths(item.cost)}`;
    updateButton();
  });

  //Event listener that displays desription on mouse hover
  item.button.addEventListener("mouseover", function () {
    console.log(`${item.description}`);
  });
}

//Helper function to round numbers to hundredths place and return string
//Code for rounding decimal places found at: https://stackoverflow.com/a/5623156
function roundHundredths(value: number) {
  return value.toFixed(2).replace(/\.00$/, ""); //Rounds to the hundredths place
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
  for (const item of availableItems) {
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
