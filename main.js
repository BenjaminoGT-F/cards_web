// Database of countries (to be loaded from JSON or SQL)
import countriesList from "./data/nation.json" assert {type: "json"};
import marquesList from "./data/marque.json" assert {type: "json"};
import vehiclesList from "./data/cars.json" assert {type: "json"};
import * as utils from "./modules/utils.js";
import {CarCard} from "./modules/card.car.js";

const divSelectors = document.getElementById("selectors");
const divCarCard = document.getElementById("carCard");
let option; // Container for creating and setting new options

/////////////////////////////////////////////////////////////////////////////////////////
// SELECTOR BUILDERS ////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// CREATE COUNTRIES
// Label
divSelectors.appendChild(document.createElement("label"));
let labelCountries = document.querySelector("div#selectors > label:last-child");
labelCountries.className = "selector";
labelCountries.setAttribute("for","countries");
labelCountries.innerHTML = "Select a country: ";

// Select
divSelectors.appendChild(document.createElement("select"))
let selectCountries = document.querySelector("div#selectors > select:last-child");
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
divSelectors.appendChild(document.createElement("label"));
let labelMarques = document.querySelector("div#selectors > label:last-child");
labelMarques.className = "selector";
labelMarques.setAttribute("for","marques");
labelMarques.innerHTML = "Select a marque: ";

// Select
divSelectors.appendChild(document.createElement("select"));
let selectMarques = document.querySelector("div#selectors > select:last-child");
selectMarques.className = "selector";
selectMarques.setAttribute("id", "marques");
selectMarques.setAttribute("disabled", true);

// CREATE VEHICLES
// Label
divSelectors.appendChild(document.createElement("br"));
divSelectors.appendChild(document.createElement("label"));
let labelVehicles = document.querySelector("div#selectors > label:last-child");
labelVehicles.className = "selector";
labelVehicles.setAttribute("for","vehicles");
labelVehicles.innerHTML = "Select a vehicle: ";

// Select
divSelectors.appendChild(document.createElement("select"));
let selectVehicles = document.querySelector("div#selectors > select:last-child");
selectVehicles.className = "selector";
selectVehicles.setAttribute("id", "vehicles");
selectVehicles.setAttribute("disabled", true);

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
})


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
    let car = vehiclesList[document.querySelector("select#vehicles").value];
    let card = new CarCard(car, "-");

    updateCard(card);

    console.log("DEBUG: " + JSON.stringify(car));
    console.log("DEBUG: " + JSON.stringify(card));
});

function updateCard(card) {
    document.querySelector("div#carCard input#marque").value = card.marque;
    document.querySelector("div#carCard input#name").value = card.modelName + " " + card.trimName + " " + card.generation;
    document.querySelector("div#carCard input#classe").value = card.classe;
    document.querySelector("div#carCard input#decade").value = card.decade;
    document.querySelector("div#carCard input#nation").value = card.nation;
    document.querySelector("div#carCard input#top-speed").value = card.topSpeed;
    document.querySelector("div#carCard input#acceleration").value = card.acceleration;
    document.querySelector("div#carCard input#turning").value = card.turning;
    document.querySelector("div#carCard input#durability").value = card.durability;
    document.querySelector("div#carCard input#endurance").value = card.endurance;
    document.querySelector("div#carCard input#style").value = card.style;
    document.querySelector("div#carCard input#cost").value = card.cost;
    document.querySelector("div#carCard input#rarity").value = card.rarity;
};