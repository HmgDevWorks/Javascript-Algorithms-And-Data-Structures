const inputText = document.querySelector('input[type="text"]');

const check = document.querySelector('button');
const resultText = document.querySelector("p");

// console.log("a", check);
check.addEventListener("click", (e) =>{
  e.preventDefault();
  if(inputText.value === ""){
    alert("Please input a value");
  }
   const isPalindrome = checkIfIsPalindrome(inputText.value);
   showMsg(isPalindrome);
});

function checkIfIsPalindrome(text){
  const specialChars = [' ', '_', ',', '.', '!', '?', '"', "'", '-', '(', ')', '[', ']', '{', '}'];

  text = text.toLowerCase().split('').filter(char => !specialChars.includes(char)).join('');
  const reverseText = text.split('').reverse().join('');
  return text == reverseText;
}

function showMsg(isCorrect){
  resultText.style.display="block";
  resultText.innerText = isCorrect? `${inputText.value} is a palindrome.` : `${inputText.value} is not a palindrome.`
}