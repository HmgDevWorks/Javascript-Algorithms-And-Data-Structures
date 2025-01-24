let price = 39.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const priceText = document.querySelector("#total>p>span");
priceText.textContent = price;
const purchase = (num)=>{
  let toReturn = num - price;
  if (toReturn === 0) {
    updateStatus({ status: "OPEN", change: [] });
    document.getElementById("change-due").textContent = "No change due - customer paid with exact cash";
    return;
  }
  const change = calcCid(toReturn);
  updateCid(change.change);
  updateCidSpans();
  updateStatus(change);
};

const calcCid = (amount) =>{
  const currencyUnits = {
    'ONE HUNDRED': 100,
    'TWENTY': 20,
    'TEN': 10,
    'FIVE': 5,
    'ONE': 1,
    'QUARTER': 0.25,
    'DIME': 0.1,
    'NICKEL': 0.05,
    'PENNY': 0.01
  };

  let change = [];
  let remainingAmount = amount;
  let totalCid = cid.reduce((sum, [, value]) => sum + value, 0);

  // Iteramos sobre el cid en orden inverso (de mayor a menor denominación)
  for (let i = cid.length - 1; i >= 0; i--) {
    let [unit, available] = cid[i];
    const unitValue = currencyUnits[unit];
    let unitCount = 0;

    // Calculamos cuántas unidades de esta denominación podemos usar
    while (remainingAmount >= unitValue && available > 0) {
      remainingAmount = parseFloat((remainingAmount - unitValue).toFixed(2));
      available -= unitValue;
      unitCount++;
    }

    // Si usamos alguna unidad de esta denominación, la añadimos al cambio
    if (unitCount > 0) {
      change.push([unit, unitCount * unitValue]);
    }
  }
  
  console.log("remainingAmount", remainingAmount);
  // Verificamos si pudimos dar el cambio exacto
  if (remainingAmount === 0) {
    // Calculamos el dinero restante en la caja después de dar el cambio
    const remainingCid = parseFloat((totalCid - amount).toFixed(2));
    console.log("remaining", remainingCid);
    console.log("totalCid", totalCid);
    console.log("amount", amount);
    if (remainingCid === 0) {
      return { status: "CLOSED", change: change };
    } else {
      return { status: "OPEN", change: change };
    }
  } else {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
};

const updateCid = (change) => {
  for (let [changeUnit, changeAmount] of change) {
    // Encuentra el índice del tipo de moneda en cid
    let cidIndex = cid.findIndex(([unit]) => unit === changeUnit);
    
    if (cidIndex !== -1) {
      // Resta la cantidad del cambio del total disponible en cid
      cid[cidIndex][1] = cid[cidIndex][1] - changeAmount;
    }
  }
};

const updateCidSpans = () => {
  const changeSpans = [...document.querySelectorAll("#change-info > p > span")];
  for(let i = 0; i < cid.length; i++){
    changeSpans[i].textContent = cid[i][1];
  }
};

const updateStatus = (change) => {
  const statusDiv = document.getElementById("change-due");
  statusDiv.textContent = ``;
  const statusEl = document.createElement("p");
  statusEl.textContent = `Status: ${change.status}`;
  statusDiv.append(statusEl);
  
   if (change.change.length > 0) {
    change.change.forEach(([unit, amount]) => {
      if(amount > 0){
        statusDiv.textContent += ` ${unit}: $${amount.toFixed(2)}`;
      }
    });
  }
};

const moneyGiven = document.querySelector('input[type="number"]');
const purchaseBtn = document.querySelector('button[type="submit"]');

purchaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(moneyGiven.value < price){
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  purchase(moneyGiven.value);
});

updateCidSpans();