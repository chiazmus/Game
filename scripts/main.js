// New Buttons to implement later:
//
// --Vampire--
// Vampire button, which spawns when a wizard button is infected by a zombie button.
// When clicked, it tries to create three more zombie buttons.
// When a Vampire button is present, a wizard button will create 3 normal buttons if clicked, killing the vampire button.
// It will starve if there are no normal buttons left.
// It is worth 5 points.
//
// --Unicorn--
// A Unicorn button is the rarest one, and when clicked will disappear. It is worth 50 points.
//
// --Kraken--
// Kraken button, which spawns when a dragon button is infected by a zombie button. It will eat up to 3 random buttons when clicked
// and will attack other Krakens if there are no other button types left.
// A dragon button will attack the Kraken if clicked, killing it.
// It will starve if there are no buttons left to eat.
// It is worth 7 points.
/* 
Store features to implement:
Graveyard, which makes undead creatures more common, and worth more points
Magical consortium, makes magical creatures more common and worth more points
Bestiary, makes beasts more common and worth more points
Button Village, makes normal buttons worth more

Each one is a different path, the undead path focuses on undead upgrades
the magical path on upgrades for magical creatures, including different types of undead/bestial repellents
the bestiary focuses on upgrades for beastial creatures, allowing them to eat undead and others
and button village focuses on making normal buttons better.

Once one upgrade path is taken, the others will close.
*/

// Define probabilities for each button type
const typesOfButtons = {
    "normal": 0.5,
    "wizard": 0.1,
    "dragon": 0.05,
    "zombie": 0.01,
    "ninja": 0.005,
    "unicorn": 0.001
};

// Map button names to their types
const buttonNames = {
    'Button :)': "normal",
    'Wizard Button 🧙‍♂️': "wizard",
    "Dragon Button 🐉": "dragon",
    "Zombie Button 🧟": "zombie",
    "Ninja Button 🥷": "ninja",
    "Unicorn Button 🦄": "unicorn"
};

// Define points for each button type
const buttonTypePoints = {
    "normal": 1,
    "wizard": 3,
    "dragon": 7,
    "zombie": 1,
    "ninja": 9,
    "unicorn": 20
};

// Set the maximum number of buttons allowed
let maxButtons = 36;
let zombies = false;

// Function to randomly change the button type
function changeButton() {
    let probability = Math.random();
    let cumulativeProbability = 0;
    let selectedButton = "normal"; // Default button type

    // Determine button type based on cumulative probability
    for (let key in typesOfButtons) {
        cumulativeProbability += typesOfButtons[key];
        if (probability <= cumulativeProbability) {
            selectedButton = key;
            break;
        }
    }

    // Create the appropriate button based on the selected type
    if (zombies) {
        makeZombieButton();
    } else {
        switch (selectedButton) {
            case "normal":
                makeButton();
                break;
            case "wizard":
                makeWizardButton();
                break;
            case "dragon":
                makeDragonButton();
                break;
            case "ninja":
                makeNinjaButton();
                break;
            case "zombie":
                makeZombieButton();
                break;
            case "unicorn":
                makeUnicornButton();
                break;
        }
    }
}

// Function to check and limit the number of buttons
function checkButtonPopulation() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    while (buttons.length > maxButtons) {
        writeToScreen("One of your buttons died of overpopulation.");
        // Remove the first button from the DOM
        main.removeChild(buttons[0]);

        // Update the button list after removal
        buttons = main.querySelectorAll('button');
    }
}

// Function to count and display total button points
function countButtonPoints() {
    let points = 0;
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    // Calculate total points
    zombies = false;
    for (let i = 0; i < buttons.length; i++) {
        points += buttonTypePoints[buttonNames[buttons[i].textContent]];
        if (buttons[i].textContent == 'Zombie Button 🧟') {
            zombies = true;
        }
    }

    // Update the displayed points
    let headerHeader = document.querySelector('h2');
    headerHeader.textContent = "You have " + points + " button points.";
    checkButtonPopulation();
}

// Function to update the screen with a message
function writeToScreen(message) {
    let textOutput = document.querySelector('p');
    textOutput.textContent = message;
}

// Function to create a normal button
function makeButton() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Button :)';
    button.onclick = changeButton;
    main.appendChild(button);
    writeToScreen("You made another button appear!");
    countButtonPoints();
}

// Function to create a unicorn button
function makeUnicornButton() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Unicorn Button 🦄';
    button.onclick = unicornAction;
    main.appendChild(button);
    writeToScreen("A rare unicorn button appears!");
    countButtonPoints();
}

// Function for unicorn button behavior
function unicornAction() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent == 'Unicorn Button 🦄') {
            writeToScreen('The unicorn button runs away!');
            main.removeChild(buttons[i]);
            return;
        }
    }
}

// Function to create a zombie button
function makeZombieButton() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent != 'Zombie Button 🧟') {
            main.removeChild(buttons[i]);
            let button = document.createElement('button');
            button.textContent = 'Zombie Button 🧟';
            button.onclick = makeZombieButton;
            main.appendChild(button);
            writeToScreen("A button becomes infected and turns into a zombie button!");
            countButtonPoints();
            return;
        }
    }

    if (buttons.length > 1) {
        main.removeChild(buttons[0]);
        writeToScreen('One zombie button eats another zombie button!');
        countButtonPoints();
    } else {
        main.removeChild(buttons[0]);
        writeToScreen('The last zombie button dies of starvation, and a new button appears!');
        let button = document.createElement('button');
        button.textContent = 'Button :)';
        button.onclick = changeButton;
        main.appendChild(button);
        countButtonPoints();
    }
}

// Function to create a ninja button
function makeNinjaButton() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Ninja Button 🥷';
    button.onclick = ninjaAction;
    main.appendChild(button);
    writeToScreen("A ninja button appears!");
    countButtonPoints();
}

// Function for ninja button behavior
function ninjaAction() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent == 'Zombie Button 🧟') {
            main.removeChild(buttons[i]);
            writeToScreen('A ninja button kills a zombie button!');
            return;
        }
    }

    changeButton();
}

// Function to create or transform into a wizard button
function makeWizardButton() {
    let main = document.querySelector('main');

    // A normal button transforms into a wizard button
    let buttons = main.querySelectorAll('button');
    let buttonRemoved = false;
    let dragonNearby = false;
    let dragon;
    let wizards = [];

    if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent == "Button :)") {
                buttons[i].parentNode.removeChild(buttons[i]);
                buttonRemoved = true;
                break;
            }
            if (buttons[i].textContent == "Dragon Button 🐉") {
                dragonNearby = true;
                dragon = buttons[i];
            }
            if (buttons[i].textContent == "Wizard Button 🧙‍♂️") {
                wizards.push(buttons[i]);
            }
        }
    }

    if (buttonRemoved) {
        writeToScreen("A button magically transforms into a Wizard Button!");
        let button = document.createElement('button');
        button.textContent = 'Wizard Button 🧙‍♂️';
        button.onclick = makeWizardButton;
        main.appendChild(button);
        countButtonPoints();
    } else if (dragonNearby) {
        main.removeChild(dragon);
        writeToScreen("A wizard button casts a spell upon one of the dragon buttons and makes it disappear!");
        countButtonPoints();
    } else if (wizards.length >= 2) {
        main.removeChild(wizards[0]);
        writeToScreen("Two wizard buttons get into a wizard duel and one perishes!");
        countButtonPoints();
    } else {
        makeButton();
    }
}

// Function to create a dragon button
function makeDragonButton() {
    let main = document.querySelector('main');

    // Dragon buttons eat either two wizard buttons or three normal buttons
    let buttons = main.querySelectorAll('button');
    let wizardButtons = [];
    let normalButtons = [];
    let dragonButtons = [];
    let zombieButtons = [];
    let survived = false;

    if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent == "Button :)") {
                normalButtons.push(buttons[i]);
            } else if (buttons[i].textContent == "Wizard Button 🧙‍♂️") {
                wizardButtons.push(buttons[i]);
            } else if (buttons[i].textContent == 'Dragon Button 🐉') {
                dragonButtons.push(buttons[i]);
            } else if (buttons[i].textContent == "Zombie Button 🧟") {
                zombieButtons.push(buttons[i]);
            }
        }
    }

    if (wizardButtons.length >= 2) {
        main.removeChild(wizardButtons.pop());
        main.removeChild(wizardButtons.pop());
        writeToScreen("A dragon button appears and eats two wizard buttons!");
        survived = true;
    } else if (normalButtons.length >= 3) {
        main.removeChild(normalButtons.pop());
        main.removeChild(normalButtons.pop());
        main.removeChild(normalButtons.pop());
        writeToScreen("A dragon button appears and eats three buttons!");
        survived = true;
    } else if (zombieButtons.length >= 4) {
        main.removeChild(zombieButtons.pop());
        main.removeChild(zombieButtons.pop());
        main.removeChild(zombieButtons.pop());
        main.removeChild(zombieButtons.pop());
        writeToScreen("A dragon button appears and eats four zombie buttons!");
        survived = true;
    }

    if (survived) {
        let button = document.createElement('button');
        button.textContent = 'Dragon Button 🐉';
        button.onclick = makeDragonButton;
        main.appendChild(button);
        countButtonPoints();
    } else if (dragonButtons.length <= 1) {
        makeButton();
    } else {
        main.removeChild(dragonButtons.pop());
        writeToScreen("Two dragon buttons fight each other and one is killed!");
        countButtonPoints();
    }
}
