document.addEventListener(("DOMContentLoaded"), init);

function init(){
  const checkBtn = document.getElementById("check-btn");
  checkBtn.addEventListener("click", checkNumber);

  const clearBtn = document.getElementById("clear-btn");
  
clearBtn.addEventListener("click", (e) => clear(e));
}

function checkNumber(){
  const tel = document.getElementById("user-input").value;
  if (tel == ""){
    alert("Please provide a phone number");
    return;
  }
  const msgContainer = document.getElementById("results-div");
  const telRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const msg = document.createElement("p");
  if (telRegex.test(tel)){
    msg.innerHTML = `Valid US number: ${tel}`;
        msg.classList.add("valid");
  } else {
    msg.innerHTML = `Invalid US number: ${tel}`;
    msg.classList.add("invalid");
  }
  msgContainer.appendChild(msg)
}

function clear(e){
  e.preventDefault();

 const msgContainer = document.getElementById("results-div");
  msgContainer.innerHTML = "";
}