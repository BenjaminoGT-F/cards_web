// Database of countries (to be loaded from JSON or SQL)
import countriesList from "./data/nation.json" assert {type: "json"};
import marquesList from "./data/marque.json" assert {type: "json"};
import vehiclesList from "./data/cars.json" assert {type: "json"};
import * as utils from "./modules/utils.js";
import {CarCard} from "./modules/card.car.js";

let h1, option, card, car; // Containers for creating and setting new elements

/////////////////////////////////////////////////////////////////////////////////////////
// BASE STRUCTURE BUILDER ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

let scriptMain = document.querySelector("script[src='./main.js']");
let divMain = scriptMain.parentNode.insertBefore(document.createElement("div"), scriptMain.nextSibling);
divMain.style = "margin-left: auto; margin-right: auto; width: 400px;";

h1 = divMain.appendChild(document.createElement("h1"));
h1.innerHTML = "Find a Dealer"
let divSelectors = divMain.appendChild(document.createElement("div"))
divSelectors.setAttribute("id", "selectors");

h1 = divMain.appendChild(document.createElement("h1"));
h1.innerHTML = "Car Card";
let divCarCard = divMain.appendChild(document.createElement("div"));
divCarCard.setAttribute("id", "carCard");
divCarCard.style = "margin-left: auto; margin-right: auto; width: 256px;";

let mainMenuBar = divMain.appendChild(document.createElement("div"));
mainMenuBar.setAttribute("class", "main-menu");
createCarCardInputs(true, mainMenuBar.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "credit-balance",
        label: "Balance Cr."
    }
]);
let divBuy = mainMenuBar.appendChild(document.createElement("div"));
let creditBalance = document.querySelector("#credit-balance");
let buyButton = divBuy.appendChild(document.createElement("button"));
buyButton.setAttribute("id","buyButton");
buyButton.setAttribute("disabled", null);
buyButton.innerHTML = "Buy";

let myCardGarage = [];
let currentBalance = 100;
creditBalance.value = currentBalance;

h1 = divMain.appendChild(document.createElement("h1"));
h1.innerHTML = "My Garage";
let divGarage = divMain.appendChild(document.createElement("div"));

/////////////////////////////////////////////////////////////////////////////////////////
// CAR CARD BUILDER /////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

createCarCardInputs(false, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "marque"
    },
    {
        class: "card-detail",
        id: "name"
    },
    {
        class: "card-stat",
        id: "classe"
    }
]);
let cardPhoto = divCarCard.appendChild(document.createElement("img"));
cardPhoto.id = "cardPhoto";
cardPhoto.className = "card-photo";
createCarCardInputs(false, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "decade"
    },
    {
        class: "card-detail",
        id: "description"
    },
    {
        class: "card-stat",
        id: "nation"
    }
]);
createCarCardInputs(true, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "top-speed",
        label: "Top Speed"
    },
    {
        class: "card-stat",
        id: "handling",
        label: "Handling"
    }
]);
createCarCardInputs(true, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "acceleration",
        label: "Acceleration"
    },
    {
        class: "card-stat",
        id: "durability",
        label: "Durability"
    }
]);
createCarCardInputs(true, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "braking",
        label: "Braking"
    },
    {
        class: "card-stat",
        id: "endurance",
        label: "Endurance"
    }
]);
createCarCardInputs(true, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "style",
        label: "Style"
    }
]);
createCarCardInputs(true, divCarCard.appendChild(document.createElement("div")), [
    {
        class: "card-stat",
        id: "cost",
        label: "Price Cr."
    },
    {
        class: "card-stat",
        id: "rarity",
        label: "Rarity"
    }
]);
// Re-arrange elements as required
$("#cost").insertBefore("label[for='cost']");
document.querySelector("label[for=rarity]").setAttribute("style", "text-align: right");

function createCarCardInputs(withLabels, div, inputsObjectArray) {
    let input, label;
    inputsObjectArray.forEach(function(value) {
        if (withLabels) {
            label = div.appendChild(document.createElement("label"));
            label.setAttribute("class", value.class);
            label.setAttribute("for", value.id);
            label.innerHTML = value.label;
        };
        input = div.appendChild(document.createElement("input"));
        input.setAttribute("disabled", null);
        input.setAttribute("class", value.class);
        input.setAttribute("id", value.id);
    });
};



/////////////////////////////////////////////////////////////////////////////////////////
// SELECTOR BUILDERS ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// CREATE COUNTRIES
// Label
let labelCountries = divSelectors.appendChild(document.createElement("label"));
labelCountries.className = "selector";
labelCountries.setAttribute("for","countries");
labelCountries.innerHTML = "Select a country: ";

// Select
let selectCountries = divSelectors.appendChild(document.createElement("select"))
selectCountries.className = "selector";
selectCountries.setAttribute("id", "countries");

// Options
// Defaults
selectCountries.appendChild(document.createElement("option"));
option = document.querySelector("select#countries > option");
option.setAttribute("selected", null);
option.setAttribute("disabled", null);
option.setAttribute("hidden", null);
// Loop through database to add each country
countriesList.forEach(function (value, index) {
    if (value.id) {     // Skip out record 0
        selectCountries.appendChild(document.createElement("option"));
        option = document.querySelector("select#countries > option:last-child");
        option.value = index;
        option.innerHTML = value.description;
    };
});

// CREATE MARQUES
// Label
divSelectors.appendChild(document.createElement("br"));
let labelMarques = divSelectors.appendChild(document.createElement("label"));
labelMarques.className = "selector";
labelMarques.setAttribute("for","marques");
labelMarques.innerHTML = "Select a marque: ";

// Select
let selectMarques = divSelectors.appendChild(document.createElement("select"));
selectMarques.className = "selector";
selectMarques.setAttribute("id", "marques");
selectMarques.setAttribute("disabled", true);

// CREATE VEHICLES
// Label
divSelectors.appendChild(document.createElement("br"));
let labelVehicles = divSelectors.appendChild(document.createElement("label"));
labelVehicles.className = "selector";
labelVehicles.setAttribute("for","vehicles");
labelVehicles.innerHTML = "Select a vehicle: ";

// Select
let selectVehicles = divSelectors.appendChild(document.createElement("select"));
selectVehicles.className = "selector";
selectVehicles.setAttribute("id", "vehicles");
selectVehicles.setAttribute("disabled", true);

// CREATE GARAGE
// Select
let garageList = divGarage.appendChild(document.createElement("select"));
garageList.className = "selector";
garageList.setAttribute("id", "own-vehicles");

// Options
// Defaults
garageList.appendChild(document.createElement("option"));
option = document.querySelector("select#own-vehicles > option");
option.setAttribute("selected", null);
option.setAttribute("disabled", null);
option.setAttribute("hidden", null);


////////////////////////////////////////////////////////////////////////////////////////////
// SELECTOR CHANGERS ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// COUNTRIES
document.querySelector("select#countries").addEventListener("change", function() {
    // Refresh the status of the other selectors
    selectMarques = document.querySelector("select#marques");
    selectVehicles = document.querySelector("select#vehicles");
    
    // remove any existing nodes
    while (selectMarques.lastChild) {
        selectMarques.remove(selectMarques.lastChild);
    };
    // Add the blank one
    selectMarques.appendChild(document.createElement("option"));
    option = document.querySelector("select#marques > option");
    option.setAttribute("selected", null);
    option.setAttribute("disabled", null);
    option.setAttribute("hidden", null);

    // If the marques selector already exists, no need to unhide it again
    if (selectMarques.getAttribute("disabled")) {
        labelMarques.removeAttribute("disabled");
        selectMarques.removeAttribute("disabled");
    };
    // If the vehicle one has been activated from a previous run, disable that until a new marque has been picked
    if (selectVehicles.getAttribute("disabled") == null) {
        selectVehicles.setAttribute("disabled", null);
        buyButton.setAttribute("disabled", null);
    };

    // Loop through each marque in the database returning those that match the ID to populate the marques list
    let currentCountrySelectValue = document.querySelector("select#countries").value;
    marquesList.forEach(function (value, index) {
        if (value.nationality==currentCountrySelectValue) {
            selectMarques.appendChild(document.createElement("option"));
            option = document.querySelector("select#marques > option:last-child");
            option.value = index;
            option.innerHTML = value.name;
        };
    });

    return true;
});


// MARQUES
document.querySelector("select#marques").addEventListener("change", function() {
    // Unhide the car selector
    selectVehicles = document.querySelector("select#vehicles");
    
    // remove any existing nodes
    while (selectVehicles.lastChild) {
        selectVehicles.remove(selectVehicles.lastChild);
    };
    // Add the blank one
    selectVehicles.appendChild(document.createElement("option"));
    option = document.querySelector("select#vehicles > option");
    option.setAttribute("selected", null);
    option.setAttribute("disabled", null);
    option.setAttribute("hidden", null);

    // If the vehicles selector already exists, no need to unhide it again
    if (selectVehicles.getAttribute("disabled")) {
        labelVehicles.removeAttribute("disabled");
        selectVehicles.removeAttribute("disabled");
    };

    // Loop through each vehicle in the database returning those that match the ID to populate the marques list
    let currentMarqueSelectValue = document.querySelector("select#marques").value;
    vehiclesList.forEach(function (value, index) {
        if (value.marqueId==currentMarqueSelectValue) {
            selectVehicles.appendChild(document.createElement("option")); // TODO: set variable option directly to this like "p" below?
            option = document.querySelector("select#vehicles > option:last-child");
            option.value = index;
            option.innerHTML = value.modelName + " " + value.trimName + " " + utils.generationInRoman(value.generationId);
        };
    });

    return true;
});

// VEHICLES
document.querySelector("select#vehicles").addEventListener("change", function() {
    // First clear any exist card
    if (document.querySelector("div#carCard > p")) {
        divCarCard.removeChild(document.querySelector("div#carCard > p"));
    };

    // Get car basic stats from database based on currently selected value, then generate a new car card from these stats
    car = vehiclesList[document.querySelector("select#vehicles").value];
    card = new CarCard(car, "-");

    updateCard(card);

    buyButton.removeAttribute("disabled"); // Activate the buy button
});

// GARAGE (OWN-VEHICLES)
// Update car card when garage item is selected


//////////////////////////////////////////////////////////////////////////////////
// SUB-ROUTINES //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function updateCard(card) {
    document.querySelector("div#carCard input#marque").value = card.marque;
    document.querySelector("div#carCard input#name").value = card.modelName + " " + card.trimName + " " + card.generation;
    document.querySelector("div#carCard input#classe").value = card.classe;
    document.querySelector("div#carCard input#decade").value = card.decade;
    document.querySelector("div#carCard input#nation").value = card.nation;
    document.querySelector("div#carCard input#top-speed").value = card.topSpeed;
    document.querySelector("div#carCard input#acceleration").value = card.acceleration;
    document.querySelector("div#carCard input#braking").value = card.braking;
    document.querySelector("div#carCard input#handling").value = card.handling;
    document.querySelector("div#carCard input#durability").value = card.durability;
    document.querySelector("div#carCard input#endurance").value = card.endurance;
    document.querySelector("div#carCard input#style").value = card.style;
    document.querySelector("div#carCard input#cost").value = card.cost;
    document.querySelector("div#carCard input#rarity").value = card.rarity;
};

buyButton.addEventListener("click", function() {
    if(currentBalance < card.cost) {
        // First work out whether enough funds exist
        alert("Insufficient funds!");
    }
    else if(myCardGarage.length == 10) {
        // Then work out if there's actually enough space in the garage (max 10!)
        alert("Garage already full!")
    }
    else {
        // Otherwise continue with purchase by subtracting cost from balance
        let reg;
        currentBalance = currentBalance - card.cost;
        creditBalance.value = currentBalance;
        // Assigning a reg as a unique identifier - let users assign their own or assign one by default
        // TODO: Uniqueness evaluator for reg
        do {
            reg = prompt("Please enter registration (max. 7 characters) or leave blank for randomisation");
            if (reg == '' || reg === null) {
                reg = utils.generateRandomReg();
            };
        }
        while (reg.length > 7);
        // Create a new instance of the car with the reg as a unique identifier and store in garage
        myCardGarage.push(new CarCard(car, reg));
        // Add latest carCard to garage
        garageList.appendChild(document.createElement("option"));
        option = document.querySelector("select#own-vehicles > option:last-child");
        option.value = myCardGarage[myCardGarage.length - 1].carId;
        option.innerHTML =  myCardGarage[myCardGarage.length - 1].marque + " " + myCardGarage[myCardGarage.length - 1].modelName + " " + myCardGarage[myCardGarage.length - 1].trimName + " " + myCardGarage[myCardGarage.length - 1].generation + " (" + myCardGarage[myCardGarage.length - 1].reg + ")";
        console.log(myCardGarage[myCardGarage.length - 1].debug());
    };
});