const buttons = Array.from(document.querySelectorAll(".buttons"));
const counterNode = document.querySelector("#counter");
let counter = 0;

counterNode.textContent = counter;

buttons.map((ele) => {
  ele.addEventListener("click", () => {
    if (ele.textContent == "increase") {
      counter++;
    } else if (ele.textContent == "decrease") {
      counter--;
    } else {
      counter = 0;
    }

    if (counter > 0) {
      counterNode.style.color = "green";
    } else if (counter < 0) {
      counterNode.style.color = "red";
    } else {
      counterNode.style.color = "black";
    }

    counterNode.textContent = counter;
  });
});
