let inputNumber = document.getElementById("number");

let convertButton = document.getElementById("convert-btn");

let outputText = document.getElementById("output");

convertButton.addEventListener("click", (e) =>{
  e.preventDefault();
  calcNumber(inputNumber.value);
  console.log(calcNumber(inputNumber.value));

outputText.classList.remove("hidden");

})

function calcNumber(number){
  console.log(number);
  number = parseInt(number);
  if(isNaN(number)){
    showError("Please enter a valid number");
    return;
  } else if (number > 3999){
    showError("Please enter a number less than or equal to 3999.");
    return;
  } else if(number < 1){
    showError("Please enter a number greater than or equal to 1.");
    return;
  }

const romanNumerals = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (number >= romanNumerals[i][0]) {
            result += romanNumerals[i][1];
            number -= romanNumerals[i][0];
        }
    }

    showResult(result);
  
}

function showResult(result){
  outputText.innerText = result;
    if(outputText.classList.contains("error")){
    outputText.classList.remove("error");
  }
}

function showError(error){
  outputText.innerText = error;
  if(!outputText.classList.contains("error")){
    outputText.classList.add("error");
  }
}