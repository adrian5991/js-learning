/*
This currently acts like an infinite amount of people are able to work on an order.
Next thing to do is figure out how to alter this so that orders are made one at a time.
*/

const orders = [];

document.querySelector("#order").addEventListener("click", () => {
  const flavour = document.querySelector("#flavours").value;
  const orderTime = getRandomInt(3, 10);
  const meltTime = getRandomInt(5, 10);

  alert(`Your ${flavour} ice cream will take ${orderTime} seconds to complete`);

  const myPromise = new Promise((resolve, reject) => {
    const start = Date.now();
    console.log(orderTime, meltTime);
    const id = setInterval(() => {
      const delta = Date.now() - start;
      const elapsed = Math.floor(delta / 1000);
      console.log(elapsed);
      if (elapsed === orderTime) {
        resolve(`Your ${flavour} ice cream is ready`);
        clearInterval(id);
      } else if (elapsed === meltTime) {
        reject("Your order took too long to make so the ice cream melted. No refunds!");
        clearInterval(id);
      }
    }, 1000);
  });

  orders.push(myPromise);
  console.log(orders);

  myPromise
    .then((message) => {
      alert(message);
      console.log(orders);
      orders.shift();
    })
    .then(() => console.log(orders))
    .catch((error) => alert(error));
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
