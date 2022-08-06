// Database of countries (to be loaded from JSON or SQL)
import countriesList from "./data/nation.json" assert {type: "json"};
import marquesList from "./data/marque.json" assert {type: "json"};
import vehiclesList from "./data/cars.json" assert {type: "json"};
import * as utils from "./modules/utils.js";
import {CarCard} from "./modules/card.car.js";

// Create a new selectors option for countries with a label and a default blank option
const divSelectors = document.getElementById("selectors");
const divCarCard = document.getElementById("carCard");
let option, p; // Container for creating and setting new options and child paragraphs

divSelectors.appendChild(document.createElement("label"))
let labelCountries = document.querySelector("div#selectors > label:last-child");
labelCountries.setAttribute("for","countries");
labelCountries.innerHTML = "Select a country: ";

divSelectors.appendChild(document.createElement("select"))
let selectCountries = document.querySelector("div#selectors > select:last-child");
selectCountries.setAttribute("id", "countries");

selectCountries.appendChild(document.createElement("option"));
option = document.querySelector("select#countries > option");
option.setAttribute("selected", null);
option.setAttribute("disabled", null);
option.setAttribute("hidden", null);

// Create the rest of the lookups, but hidden for now
divSelectors.appendChild(document.createElement("br"));
divSelectors.appendChild(document.createElement("label"));
let labelMarques = document.querySelector("div#selectors > label:last-child");
labelMarques.setAttribute("for","marques");
labelMarques.innerHTML = "Select a marque: ";
labelMarques.setAttribute("hidden", true);

divSelectors.appendChild(document.createElement("select"));
let selectMarques = document.querySelector("div#selectors > select:last-child");
selectMarques.setAttribute("id", "marques");
selectMarques.setAttribute("hidden", true);
selectMarques.setAttribute("disabled", true);

divSelectors.appendChild(document.createElement("br"));
divSelectors.appendChild(document.createElement("label"));
let labelVehicles = document.querySelector("div#selectors > label:last-child");
labelVehicles.setAttribute("for","vehicles");
labelVehicles.innerHTML = "Select a vehicle: ";
labelVehicles.setAttribute("hidden", true);

divSelectors.appendChild(document.createElement("select"));
let selectVehicles = document.querySelector("div#selectors > select:last-child");
selectVehicles.setAttribute("id", "vehicles");
selectVehicles.setAttribute("hidden", true);
selectVehicles.setAttribute("disabled", true);

// For each country in the DB, add a new option to the selector, get the newly added option and add the relevant details
countriesList.forEach(function (value, index) {

    selectCountries.appendChild(document.createElement("option"));
    // .
    option = document.querySelector("select#countries > option:last-child");
    option.value = index;
    option.innerHTML = value.description;
});


////////////////////////////////////////////////////////////////////////////////////////////
// SELECTORS ///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// COUNTRIES
document.querySelector("select#countries").addEventListener("change", function() {
    // Unhide the marques selector
    selectMarques = document.querySelector("select#marques");
    
    // remove any existing nodes
    while(selectMarques.lastChild) {
        selectMarques.remove(selectMarques.lastChild);
    };
    // Add the blank one
    selectMarques.appendChild(document.createElement("option"));
    option = document.querySelector("select#marques > option");
    option.setAttribute("selected", null);
    option.setAttribute("disabled", null);
    option.setAttribute("hidden", null);

    // If the marques selector already exists, no need to unhide it again
    if (selectMarques.getAttribute("hidden")) {
        labelMarques.removeAttribute("hidden");
        labelMarques.removeAttribute("disabled");
        selectMarques.removeAttribute("hidden");
        selectMarques.removeAttribute("disabled");
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
    if (selectVehicles.getAttribute("hidden")) {
        labelVehicles.removeAttribute("hidden");
        labelVehicles.removeAttribute("disabled");
        selectVehicles.removeAttribute("hidden");
        selectVehicles.removeAttribute("disabled");
    };

    // Loop through each vehicle in the database returning those that match the ID to populate the marques list
    let currentMarqueSelectValue = document.querySelector("select#marques").value;
    vehiclesList.forEach(function (value, index) {
        if (value.marqueId==currentMarqueSelectValue) {
            selectVehicles.appendChild(document.createElement("option")); // TODO: set variable option directly to this like "p" below?
            option = document.querySelector("select#vehicles > option:last-child");
            option.value = index;
            option.innerHTML = value.modelName + " " + value.trimName + " " + utils.returnGenerationRoman(value.generation);
        };
    });

    return true;
});

// VEHICLES
document.querySelector("select#vehicles").addEventListener("change", function() {
    // In the card div, create a paragraph to include the inner HTML for all the car stats
    p = divCarCard.appendChild(document.createElement("p"));
    // Get car card from database based on currently selected value
    let car = vehiclesList[document.querySelector("select#vehicles").value];
    // Create new card card object from base stats

    // then write it to innerHTML
    p.innerHTML = car.modelName + " " + car.trimName + " " + utils.returnGenerationRoman(car.generation) // replace with car card class
    divCarCard.removeAttribute("hidden");
    divCarCard.removeAttribute("disabled");
    
    // This will require use of the car class (to be located in modules) which will hold all the retrieved and calculated information such as stats

});