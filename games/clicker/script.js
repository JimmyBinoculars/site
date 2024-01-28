let clicks = 0;
let grandma = 0;
let farm = 0;
let count = document.getElementById("clicks");
let buttons = document.getElementsByClassName("button");

function handleClick(type) {
  switch (type) {
    case 'main':
      clicks++;
      count.innerHTML = (`Total clicks: ${clicks}`);
      break;
    case 'grandma':
      if (clicks >= 25) {
        clicks -= 25;
        grandma++;
      }
      break;
    case 'farm':
      if (clicks >= 100) {
        clicks -= 100;
        farm++;
      }
      break;
  }
}

function frame() {
  Array.from(buttons).forEach(button => {
    console.log("HI");
    if (button.id !== "main-button") {
      let buttonCost = parseInt(button.getAttribute("cost"));
      
      if (buttonCost > clicks) {
        button.style.backgroundColor = "rgb(128, 45, 49)";
      } else {
        button.style.backgroundColor = ""; // Reset to normal color
      }
    }
  });
  document.getElementById("grandmaCount").innerHTML = `Grandmas: ${grandma}`;
  document.getElementById("farmCount").innerHTML = `Farms: ${farm}`;
}

function setClicks() {
  
  count.innerHTML = (`Total clicks: ${clicks}`);
}

function updateGrandmas() {
  clicks += grandma;
}

function updateFarms() {
  clicks += farm * 10;
}

// Set up an asynchronous loop using setInterval
setInterval(updateGrandmas, 1000);
setInterval(updateFarms, 1000);
setInterval(setClicks, 1000); // Increase clicks every second
setInterval(frame, 10000);