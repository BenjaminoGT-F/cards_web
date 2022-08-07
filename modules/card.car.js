import marques from "../data/marque.json" assert {type: "json"};
import classes from "../data/classe.json" assert {type: "json"};
import decades from "../data/decade.json" assert {type: "json"};
import nations from "../data/nation.json" assert {type: "json"};
import {generateRandomReg, generationInRoman, statCalculator} from "./utils.js";

export class CarCard {
    constructor(vehicle, reg) {
        this.carId = vehicle.carId;
        this.reg = (function() {
            if (reg) {
                return reg;
            }
            else {
                return generateRandomReg();
            };
        })();        
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
        this.turning = 101 - (function() {
            // To review this. Does height need more of an impact?
            let combined = vehicle.dimensionsM.length + vehicle.dimensionsM.width + vehicle.dimensionsM.height;
            return statCalculator(combined, 6, 10);
        })();
        this.durability = statCalculator(vehicle.kerbWeightKg, 500, 2700);
        this.endurance = (function() {
            // needs to be better worked-out to find the most fuel efficient cars with the biggest fuel tank and vice versa
            // Ford Focus 1,000 miles on single 52L tank
            let consumption = statCalculator(vehicle.combinedFuelConsumptionMpg, 5, 65);
            let tankSize = statCalculator(vehicle.fuelTankCapacityL, 5, 130);
            return Math.round((consumption + tankSize) / 2);
        })();
        this.style = vehicle.styleRating;
        
        this.overall = Math.round((this.topSpeed + this.acceleration + this.turning + this.durability + this.endurance + this.style)/6);
        this.cost = statCalculator(vehicle.price, 3000, 300000);
        this.rarity = statCalculator(vehicle.numbersSold, 0, 250000);
    };
}