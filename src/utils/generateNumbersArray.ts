export default function generateNumbersArray(max = 31) {

    const numbersArray = [];

    for (let i = 1; i <= max; i++) {
        numbersArray.push(i);
    }

    return numbersArray;
}
