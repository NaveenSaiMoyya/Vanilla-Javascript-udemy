const srcCurrency = document.getElementById("currency-one");
const destCurrency = document.getElementById("currency-two");
const srcAmount = document.getElementById("amount-one");
const destAmount = document.getElementById("amount-two");
const rateEle = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rates from ExchangeRate-API and update the dom
function calculate() {
  const currency_one = srcCurrency.value;
  const currency_two = destCurrency.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEle.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      destAmount.value = (srcAmount.value * rate).toFixed(3);
    });
}

// event listeners
srcCurrency.addEventListener("change", calculate);
destCurrency.addEventListener("change", calculate);
if (srcAmount) srcAmount.addEventListener("input", calculate);
destAmount.addEventListener("input", calculate);
//swap event listener to swap src and dest currency types
swap.addEventListener("click", () => {
  const temp = srcCurrency.value;
  srcCurrency.value = destCurrency.value;
  destCurrency.value = temp;
  calculate();
});

calculate();
