export const generationInRoman = function (num) {
    const romanNumeralList = ["N", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
    return romanNumeralList[num];
};

export const generateRandomReg = function () {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randStr = "";

    for (let i = 0; i < 7; i++) {
        randStr += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    return randStr;
};

export function statCalculator(value, min, max) {
    // Base the stat on the min-max range percentage
    max = max-min;
    value = value-min;
    let score = Math.round((value/max) * 100);
    
    if (score < 1) {
        return 1;
    }
    else if (score > 100) {
        return 100;
    }
    else {
        return score;
    };
};


// Deprecated, replaced by stat calculator
export function rangeEvaluatorOld(value, min, max) {
    if (value >= max) {
        return 100;
    }
    else {
        let rangeDiff = (max - min)/8   // Work out the difference for each range
        let evaluation;
        for (var i = 0; i < 100; i++) {
            evaluation = parseFloat((min + (rangeDiff * i)).toFixed(1));
            if (value < evaluation) {
                return i + 1;
            };
        };
    };
};

// Deprecated, replaced by stat calculator
export function expRangeEvaluatorOld(value, range) {
    if (value >= range[8] * 1000) {
        return 10;
    }
    else {
        for (var i = 0; i < 10; i++) {
            if (value < range[i] * 1000) {
                return i + 1;
            };
        };
    };
};