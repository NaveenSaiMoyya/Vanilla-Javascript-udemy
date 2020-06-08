const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
populateUI();

// const ticketPrice = parseInt(movieSelect.value);

function storeMovieAndPrice(movieIndex) {
  localStorage.setItem("index", movieIndex);
}

function updateCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".rows .seat.selected");
  //   console.log(selectedSeats.length);

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); // map and array function
  //map is same as forEach but returns values
  //   console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //   console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("index");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  ticketPrice = +movieSelect.value;
  updateCountAndTotal();
}

//event listener for movie change
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  storeMovieAndPrice(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});

//event listener for seat click
container.addEventListener("click", (e) => {
  //   console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});
