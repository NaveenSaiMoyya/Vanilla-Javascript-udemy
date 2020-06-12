const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showM = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const total = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//adding new user data to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(dataProvided = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  dataProvided.forEach((item) => {
    const ele = document.createElement("div");
    ele.classList.add("person");
    ele.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(ele);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
}

function sortMoney() {
  data.sort((person1, person2) => {
    return person2.money - person1.money;
  });
  updateDOM();
}

function showmillianiares() {
  data = data.filter((person) => person.money >= 1000000);
  updateDOM();
}

function addTotal() {
  const res = data.reduce((acc, person) => {
    return acc + person.money;
  }, 0);
  addTotalToDOM(res);
}

function addTotalToDOM(res) {
  const ele = document.createElement("h3");
  ele.innerHTML = `<strong> Total </strong> ${formatMoney(res)}`;
  main.appendChild(ele);
}

addUser.addEventListener("click", getRandomUser);

double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortMoney);
showM.addEventListener("click", showmillianiares);
total.addEventListener("click", addTotal);
