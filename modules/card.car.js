import marques from "../data/marque.json" assert {type: "json"};
import classes from "../data/classe.json" assert {type: "json"};
import decades from "../data/decade.json" assert {type: "json"};
import nations from "../data/nation.json" assert {type: "json"};
import {generateRandomReg, generationInRoman, statCalculator} from "./utils.js";

export class CarCard {
    constructor(vehicle, reg) {
        this.carId = vehicle.carId;
        this.reg = reg;
        this.modelName = vehicle.modelName;
        this.trimName = vehicle.trimName;
        this.generation = generationInRoman(vehicle.generationId);
        this.marque = marques[vehicle.marqueId].name;
        this.classe = classes[vehicle.classeId].symbol;
        this.decade = decades[vehicle.decadeId].symbol;
        this.nation = nations[marques[vehicle.marqueId].nationality].symbol;
        this.holo = vehicle.racingCar;

        this.topSpeed = statCalculator(vehicle.vmaxKph, 80, 400);
        this.acceleration = 101 - statCalculator(vehicle.acc100KphSec, 3, 15);
        this.braking = 101 - statCalculator(vehicle.stoppingDistanceM, 20, 50) // https://fastestlaps.com/, https://www.consumerreports.org/car-safety/best-and-worst-braking-distances-a2960086475/, 
        this.handling = 101 - statCalculator(vehicle.dimensionsM.length + vehicle.dimensionsM.width + vehicle.dimensionsM.height, 6, 10);
        this.durability = statCalculator(vehicle.kerbWeightKg, 500, 2700);
        this.endurance = statCalculator(vehicle.combinedFuelConsumptionMpg, 5, 65)
        this.style = vehicle.styleRating;
        
        this.overall = Math.round((this.topSpeed + this.acceleration + this.braking + this.handling + this.durability + this.endurance + this.style)/6);
        this.cost = Math.round(vehicle.price / 10000);
        this.rarity = vehicle.rarityRating;  // Roughly based on numbers sold and desired rating of the carCard based on overall stats and price. Exact sales figures are too difficult to obtain
    };

    debug() {
        console.log(JSON.stringify(this));
    };
};