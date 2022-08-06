import marques from "../data/marque.json" assert {type: "json"};
import classes from "../data/classe.json" assert {type: "json"};
import decades from "../data/decade.json" assert {type: "json"};
import nations from "../data/nation.json" assert {type: "json"};
import {generateRandomReg, generationInRoman} from "./utils.js";

export class CarCard {
    constructor(vehicle, reg) {
        this.carId = vehicle.carId;
        this.reg = this.getReg(reg);
        this.modelName = vehicle.modelName;
        this.modelTrim = vehicle.modelTrim;
        this.generation = this.getGen(vehicle.generationId);
        this.marque = this.getMarque(vehicle.marqueId);
        this.class = this.getClass(vehicle.classeId);
        this.decade = this.getDecade(vehicle.decadeId);
        this.nation = this.getNation(vehicle.marqueId); // Note nationality is derived from the marque in the marques database. It's not stored within car data.
        this.holo = vehicle.racingCar;        
    };

    getReg(reg) {
        if (reg) {
            return reg;
        }
        else {
            return generateRandomReg();
        };
    };

    getGen(id) {
        return generationInRoman(id);
    };

    getMarque(id) {
        return marques[id].name;
    };

    getClass(id) {
        return classes[id].symbol;
    };

    getDecade(id) {
        return decades[id].symbol;
    };

    getNation(marqueId) {
        let id = marques[marqueId].nationality
        return nations[id].symbol;
    };
}