const types_of_buttons = {
    "normal": 0.5,
    "wizard": 0.1,
    "dragon": 0.05,
    "ninja":0.005
};

const buttonNames = {
    'Button :)':"normal",
    'Wizard Button 🧙‍♂️':"wizard",
    "Dragon Button 🐉":"dragon",
    "Ninja Button 🥷":"ninja"
};

const buttonTypePoints = {
    "normal":1,
    "wizard":3,
    "dragon":7,
    "ninja":9
};

var max_buttons = 30;

function change_button() {
    var myprobability = Math.random();
    var cumulativeProbability = 0;
    var mybutton = "normal";  // Default button type

    // Calculate cumulative probability and determine button type
    for (let key in types_of_buttons) {
        cumulativeProbability += types_of_buttons[key];
        if (myprobability <= cumulativeProbability) {
            mybutton = key;
            break;
        }
    }

    // Create the appropriate button based on the selected type
    switch (mybutton) {
        case "normal":
            make_button();
            break;
        case "wizard":
            make_wizard_button();
            break;
        case "dragon":
            make_dragon_button();
            break;
        case "ninja":
            make_ninja_button();
            break;
    }

}

function checkButtonPopulation() {
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
  
    while (buttons.length > max_buttons) {
      writeToScreen("One of your buttons died of overpopulation."); 
      // Remove the first button from the DOM
      main.removeChild(buttons[0]); 
  
      // Update the 'buttons' collection after removal
      buttons = main.querySelectorAll('button'); 
    }
  }

function countButtonPoints(){
    let points = 0
    let main = document.querySelector('main');
    let buttons = main.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++){
        points += buttonTypePoints[buttonNames[buttons[i].textContent]];
    }    
    let headerHeader = document.querySelector('h2');
    headerHeader.textContent = "You have " + points + " button points.";
    checkButtonPopulation()
}

function writeToScreen(x){
    let textOutput = document.querySelector('p');
    textOutput.textContent = x;
}

function make_button() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Button :)';
    button.onclick = change_button;
    main.appendChild(button);    
    writeToScreen("You made another button appear!");
    countButtonPoints();
}

function make_ninja_button() {
    let main = document.querySelector('main');
    let button = document.createElement('button');
    button.textContent = 'Ninja Button 🥷';
    button.onclick = change_button;
    main.appendChild(button);    
    writeToScreen("A ninja button appears!");
    countButtonPoints();
}

function make_wizard_button() {
    let main = document.querySelector('main');

    //A normal Button will become a Wizard Button

    let buttons = main.querySelectorAll('button');
    let button_removed = false;
    let dragon_nearby = false;
    let dragon;
    if (buttons.length > 0){
        for (let i = 0; i < buttons.length; i++){
            if (buttons[i].textContent == "Button :)"){
                buttons[i].parentNode.removeChild(buttons[i])
                button_removed = true;
                break;
            }
            if (buttons[i].textContent == "Dragon Button 🐉"){
                dragon_nearby = true;
                dragon = buttons[i];
            }
        }
    }

    if (button_removed){
    writeToScreen("A button magically transforms into a Wizard Button!")
    let button = document.createElement('button');
    button.textContent = 'Wizard Button 🧙‍♂️';
    button.onclick = make_wizard_button;
    main.appendChild(button);  
    countButtonPoints();
    }
    else if (dragon_nearby){
        buttons[0].parentNode.removeChild(dragon);
        writeToScreen("A wizard button casts a spell upon one of the dragon buttons and makes it disappear!");
        countButtonPoints();
    }
    else {
        make_button();
    }  
}

function make_dragon_button() {
    let main = document.querySelector('main');

    //Dragon Buttons will eat two wizard buttons or 3 normal buttons if it can't, it will die and a normal button will take its place
    let buttons = main.querySelectorAll('button');
    let wizardButtons = [];
    let normalButtons = [];
    let dragonButtons = [];
    let survived = false;

    if (buttons.length > 0){
        for (let i = 0; i < buttons.length; i++){
            if (buttons[i].textContent == "Button :)"){
                normalButtons.push(buttons[i]);
            }
            else if (buttons[i].textContent == "Wizard Button 🧙‍♂️"){
                wizardButtons.push(buttons[i]);
            }
            else if (buttons[i].textContent == 'Dragon Button 🐉'){
                dragonButtons.push(buttons[i])
            }
        }
    }

    if (wizardButtons.length >= 2){
        buttons[0].parentNode.removeChild(wizardButtons.pop());
        buttons[0].parentNode.removeChild(wizardButtons.pop());
        writeToScreen("A dragon button appears and eats two wizard buttons!");
        survived = true;
    }
    else if(normalButtons.length >= 3){
        buttons[0].parentNode.removeChild(normalButtons.pop());
        buttons[0].parentNode.removeChild(normalButtons.pop());
        buttons[0].parentNode.removeChild(normalButtons.pop());
        writeToScreen("A dragon button appears and eats three buttons!");
        survived = true;        
    }
    
    if (survived){
        let button = document.createElement('button');
        button.textContent = 'Dragon Button 🐉';
        button.onclick = make_dragon_button;
        main.appendChild(button);    
        countButtonPoints();
    }
    else if (dragonButtons.length <= 1){
        make_button()
    }
    else {
        buttons[0].parentNode.removeChild(dragonButtons.pop());
        writeToScreen("Two of the dragon buttons fight each other and one is killed!");
        countButtonPoints();
    }
}