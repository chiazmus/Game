// New Buttons to implement later:
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
    'normal': 0.5,
    'wizard': 0.1,
    'dragon': 0.05,
    'zombie': 0.01,
    'ninja': 0.005,
    'unicorn': 0.001,
    'skeleton':0.001,
    'ghost':0.001,
    'vampire':0.001
};

// Map button names to their types
const buttonNames = {
    'Button :)': 'normal',
    'Wizard Button 🧙‍♂️': 'wizard',
    'Dragon Button 🐉': 'dragon',
    'Zombie Button 🧟': 'zombie',
    'Ninja Button 🥷': 'ninja',
    'Unicorn Button 🦄': 'unicorn',
    'Skeleton Button 🩻':'skeleton',
    'Ghost Button 👻':'ghost',
    'Vampire Button 🧛':'vampire'
};

// Define points for each button type
const buttonTypePoints = {
    'normal': 1,
    'wizard': 3,
    'dragon': 7,
    'zombie': 1,
    'ninja': 9,
    'unicorn': 20,
    'skeleton':7,
    'ghost':3,
    'vampire':9
};

var allButtons = {
    'normal':1,
    'wizard':0,
    'dragon':0,
    'zombie':0,
    'ninja':0,
    'unicorn':0,
    'skeleton':0,
    'ghost':0,
    'vampire':0
};

// Set the maximum number of buttons allowed
let maxButtons = 36;
let zombies = false;
let upgradePath = 'none';
let buttonPoints = 0;
let zombieEdible = ['normal','wizard','ninja'];
let zombieCooperation = false;

//Shop Code
function shop(btn){
    switch (btn){
        case 1:
            switch (upgradePath){
                case 'none':
                    if (buttonPoints >= 50){
                        upgradePath = 'necromancy';
                        buttonTypePoints['zombie'] += 4;
                        typesOfButtons['zombie'] = 0.1
                        setShopButton(1, '<img src="assets/images/necromantic-portal.jpeg" alt="dark-magic"><i>Necromantic Rift<br>100</i>');
                        setShopButton(2, '<img src="assets/images/dark-magic.jpeg" alt="dark-magic"><br><i>Dark Magic<br>100</i>');
                        clearButtons();
                    }
                    break;
                case 'wizardry':
                    break;
                case 'necromancy':
                    if (buttonPoints >= 100){
                        typesOfButtons['skeleton'] = 0.05;
                        typesOfButtons['ghost'] = 0.05;
                        typesOfButtons['vampire'] = 0.025;
                        setShopButton(1, '<i>empty</i>');
                        clearButtons();
                    }
                    break;
            }
        break;
        case 2:
            switch (upgradePath){
                case 'none':
                    if (buttonPoints >= 50){
                        upgradePath = 'wizardry';
                        buttonTypePoints['wizard'] += 5;
                        setShopButton(1, '<img src="assets/images/button-apothecary.jpeg" alt="button-apothecary"><i>Button Apothecary<br>100</i>');
                        setShopButton(2, '<img src="assets/images/button-artificers.jpeg" alt="button-artificers"><i>Button Artificers<br>100</i>');
                        clearButtons();
                    }
                    break;
                case 'wizardry':
                    break;
                case 'necromancy':
                    break;
            }
        break;
    }
}

function setShopButton(btn,innerHtml){
    let button = document.getElementById('shop'+btn)
    button.innerHTML = innerHtml;
}

// Function to randomly change the button type
function changeButton() {
    let probability = Math.random();
    let cumulativeProbability = 0;
    let selectedButton = 'normal'; // Default button type

    // Determine button type based on cumulative probability
    for (let key in typesOfButtons) {
        cumulativeProbability += typesOfButtons[key];
        if (probability <= cumulativeProbability) {
            selectedButton = key;
            break;
        }
    }

    // Create the appropriate button based on the selected type
    switch (selectedButton) {
        case 'normal':
            makeButton();
            break;
        case 'wizard':
            makeWizardButton();
            break;
        case 'dragon':
            makeDragonButton();
            break;
        case 'ninja':
            makeNinjaButton();
            break;
        case 'zombie':
            makeZombieButton();
            break;
        case 'unicorn':
            makeUnicornButton();
            break;
        case 'skeleton':
            makeSkeletonButton();
            break;
        case 'ghost':
            makeGhostButton();
            break;
        case 'vampire':
            makeVampireButton();
            break;
        
    }

}

function clearButtons(){
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    for (i=0; i<buttons.length;i++){
        main.removeChild(buttons[i])
    }
    makeButton();
}

// Function to check and limit the number of buttons
function checkButtonPopulation() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    while (buttons.length > maxButtons) {
        writeToScreen('One of your buttons died of overpopulation.');
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
    for (let key in allButtons){
        allButtons[key] = 0;
    }
    // Calculate total points
    zombies = false;
    for (let i = 0; i < buttons.length; i++) {
        points += buttonTypePoints[buttonNames[buttons[i].textContent]];
        if (buttons[i].textContent == 'Zombie Button 🧟') {
            zombies = true;
        }
        //keeps track of how many of each button type there are.
        allButtons[buttonNames[buttons[i].textContent]] += 1;
    }

    // Update the displayed points
    let headerHeader = document.querySelector('h2');
    headerHeader.textContent = 'You have ' + points + ' button points.';
    buttonPoints = points;
    checkButtonPopulation();
}

function removeButton(type){
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        if (buttonNames[buttons[i].textContent] == type){
            main.removeChild(buttons[i]);
            return;
        }
    }        
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
    writeToScreen('You made another button appear!');
    countButtonPoints();
}

function makeVampireButton(){
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Vampire Button 🧛';
    button.onclick = vampireAction;
    main.appendChild(button);
    writeToScreen('A vampire button apparates from the darkness!');
    countButtonPoints();            
}

function vampireAction(){
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    if (allButtons['wizard'] > 0){
        removeButton('wizard');
        makeVampireButton();
        writeToScreen('A vampire button bites a wizard button creating another vampire button!');
    } else if (allButtons['vampire'] >= 2){
        removeButton('vampire');
        writeToScreen('Two vampire buttons fight and kill each other.');
    } else if (buttons.length == 1) {
        changeButton();
    } else {
        makeZombieButton();
        makeZombieButton();
        makeZombieButton();
        writeToScreen('A vampire button summons three zombie buttons.');
    }
    countButtonPoints();
}

function makeGhostButton(){
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Ghost Button 👻';
    button.onclick = ghostAction;
    main.appendChild(button);
    writeToScreen('A ghost button appears from thin air!');
    countButtonPoints();        
}

function ghostAction(){
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    if (buttons.length != allButtons['ghost']){
        makeGhostButton();
        makeGhostButton();
        writeToScreen('It appears a ghost button party is taking place!');
    } else if (buttons.length > 1) {
        removeButton('ghost');
        writeToScreen('One ghost button scares another into leaving.');
    } else {
        changeButton();
    }
    countButtonPoints();
}

function makeSkeletonButton(){
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Skeleton Button 🩻';
    button.onclick = skeletonAction;
    main.appendChild(button);
    writeToScreen('A skeleton button rises from the dead!');
    countButtonPoints();    
}

function skeletonAction(){
    if (allButtons['dragon'] > 0){
        removeButton('dragon');
        writeToScreen('A skeleton button slayed a dragon button!');
    } else {
        changeButton();
    }
    countButtonPoints();
}

// Function to create a unicorn button
function makeUnicornButton() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Unicorn Button 🦄';
    button.onclick = unicornAction;
    main.appendChild(button);
    writeToScreen('A rare unicorn button appears!');
    countButtonPoints();
}

// Function for unicorn button behavior
function unicornAction() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent == 'Unicorn Button 🦄') {
            writeToScreen('The unicorn button runs away!');
            removeButton('unicorn');
            return;
        }
    }
}

// Function to create a zombie button
function makeZombieButton() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        if ( zombieEdible.includes(buttonNames[buttons[i].textContent]) ) {
            main.removeChild(buttons[i]);
            let button = document.createElement('button');
            button.textContent = 'Zombie Button 🧟';
            button.onclick = makeZombieButton;
            main.appendChild(button);
            writeToScreen('A button becomes infected and turns into a zombie button!');
            countButtonPoints();
            return;
        }
    }

    if (buttons.length > 1 && (!zombieCooperation)) {
        removeButton('zombie');
        writeToScreen('One zombie button eats another zombie button!');
        countButtonPoints();
    } else if (buttons.length <= 1) {
        removeButton('zombie');
        writeToScreen('The last zombie button dies of starvation, and a new button appears!');
        let button = document.createElement('button');
        button.textContent = 'Button :)';
        button.onclick = changeButton;
        main.appendChild(button);
        countButtonPoints();
    } else {
        changeButton();
    }
}

// Function to create a ninja button
function makeNinjaButton() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Ninja Button 🥷';
    button.onclick = ninjaAction;
    main.appendChild(button);
    writeToScreen('A ninja button appears!');
    countButtonPoints();
}

// Function for ninja button behavior
function ninjaAction() {

    if (allButtons['zombie'] > 0) {
        removeButton('zombie');
        writeToScreen('A ninja button kills a zombie button!');
        return;
    }

    changeButton();
}

// Function to create or transform into a wizard button
function makeWizardButton() {
    let main = document.querySelector('main');

    // A normal button transforms into a wizard button

    if (allButtons['normal'] > 0) {
        removeButton('normal');
        writeToScreen('A button magically transforms into a Wizard Button!');
        let button = document.createElement('button');
        button.textContent = 'Wizard Button 🧙‍♂️';
        button.onclick = makeWizardButton;
        main.appendChild(button);
        countButtonPoints();
    } else if (allButtons['dragon'] > 0) {
        removeButton('dragon');
        writeToScreen('A wizard button casts a spell upon one of the dragon buttons and makes it disappear!');
        countButtonPoints();
    } else if (allButtons['wizard'] >= 2) {
        removeButton('wizard');
        writeToScreen('Two wizard buttons get into a wizard duel and one perishes!');
        countButtonPoints();
    } else {
        makeButton();
    }
}

// Function to create a dragon button
function makeDragonButton() {
    let main = document.querySelector('main');

    // Dragon buttons eat either two wizard buttons or three normal buttons or four zombie buttons
    let survived = false;
    
    if (allButtons['zombie'] >= 4) {
        removeButton('zombie');
        removeButton('zombie');
        removeButton('zombie');
        removeButton('zombie');
        writeToScreen('A dragon button appears and eats four zombie buttons!');
        survived = true;
    } else if (allButtons['wizard'] >= 2) {
        removeButton('wizard');
        removeButton('wizard');
        writeToScreen('A dragon button appears and eats two wizard buttons!');
        survived = true;
    } else if (allButtons['normal'] >= 3) {
        removeButton('normal');
        removeButton('normal');
        removeButton('normal');
        writeToScreen('A dragon button appears and eats three buttons!');
        survived = true;
    }

    if (survived) {
        let button = document.createElement('button');
        button.textContent = 'Dragon Button 🐉';
        button.onclick = makeDragonButton;
        main.appendChild(button);
        countButtonPoints();
    } else if (allButtons['dragon'] <= 1) {
        makeButton();
    } else {
        removeButton('dragon');
        writeToScreen('Two dragon buttons fight each other and one is killed!');
        countButtonPoints();
    }
}
