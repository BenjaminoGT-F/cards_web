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