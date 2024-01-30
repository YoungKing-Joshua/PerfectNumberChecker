// script.js

function isPerfectNumber(num) {
    let divisorsSum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            divisorsSum += i;
        }
    }
    return divisorsSum === num;
}

function checkPerfectNumber() {
    const userInput = document.getElementById("numberInput").value;
    const resultElement = document.getElementById("result");

    if (userInput.trim() === "" || isNaN(userInput) || userInput <= 0) {
        resultElement.innerText = "Please enter a valid positive integer.";
        return;
    }

    const number = parseInt(userInput, 10);

    if (isPerfectNumber(number)) {
        resultElement.innerText = `${number} is a Perfect number.`;
    } else {
        resultElement.innerText = `${number} is not a Perfect number.`;
    }
}
