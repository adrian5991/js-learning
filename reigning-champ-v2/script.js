const searchBarAttrs = {
  type: "text",
  class: "search-bar",
  placeholder: "Search Products",
  name: "Search Bar",
};

const exitSearchBtnAttrs = {
  class: "search-bar",
  id: "exit-search",
};

const searchContainerAttrs = {
  class: "search-container",
};

//search container
const searchContainer = document.createElement("div");
setAttributes(searchContainer, searchContainerAttrs);

// search bar
const searchBar = document.createElement("input");
setAttributes(searchBar, searchBarAttrs);

// exit search bar button
const exitSearchBtn = document.createElement("button");
setAttributes(exitSearchBtn, exitSearchBtnAttrs);
exitSearchBtn.innerHTML = "x";

searchContainer.appendChild(searchBar);
searchContainer.appendChild(exitSearchBtn);

// exit search bar on click mobile
exitSearchBtn.addEventListener("click", () =>
  closeSearchBar(".mobile-nav, .main-nav-items, .main-nav")
);
exitSearchBtn.addEventListener("click", () => closeSearchBar(".main-nav-items"));

// show search bar
document
  .querySelector("#magnifyDesktop")
  .addEventListener("click", () => showSearchBar(".main-nav-items", ".main-nav"));
document
  .querySelector("#magnify")
  .addEventListener("click", () =>
    showSearchBar(".mobile-nav, .main-nav-items, .main-nav", ".top")
  );

// hamburger menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("active");

  let navLinks = Array.from(document.querySelectorAll(".nav-links"));
  navLinks = navLinks.filter((e) => !e.classList.contains("nav-item"));
  navLinks.map((ele) => ele.classList.toggle("active"));
});

// scrolling
if (window.location.pathname.includes("index.html")) {
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      document.querySelector(".top").style.height = "8vh";
      document.querySelector(".main-nav").style.height = "8vh";
    } else {
      document.querySelector(".top").style.height = "10vh";
      document.querySelector(".main-nav").style.height = "10vh";
    }
  });
}

// helper functions

function showSearchBar(navItems, mainNav) {
  const navItemsArray = Array.from(document.querySelectorAll(navItems));
  navItemsArray.map((ele) => (ele.style.display = "none"));
  searchContainer.style.display = "flex";
  document.querySelector(mainNav).appendChild(searchContainer);
}

function closeSearchBar(navItems) {
  const navItemsArray = Array.from(document.querySelectorAll(navItems));
  navItemsArray.map((ele) => (ele.style.display = ""));
  searchContainer.style.display = "none";
}

function setAttributes(ele, attrsObj) {
  for (let key in attrsObj) {
    ele.setAttribute(key, attrsObj[key]);
  }
}

/*
 Shopping Cart 
*/

let cart = [];

class Item {
  constructor(name, price, quantity) {
    let item = Object.create(Item.prototype);
    item.price = price;
    item.name = name;
    item.quantity = quantity;
    return item;
  }
}

function addToCartListener() {
  const add = document.querySelectorAll(".add");
  for (let i = 0; i < add.length; i++) {
    add[i].addEventListener("click", (e) => {
      const info = document.querySelector(`#${e.target.id}`);
      const price = info.dataset.price;
      const name = info.dataset.name;
      addItem(name, price, 1);
      alert("Added to cart");
    });
  }
}

document.querySelector("#shopping").addEventListener("click", () => {
  const body = Array.from(document.querySelectorAll("body > :not(.shopping-cart)"));
  body.map((e) => e.classList.add("hidden"));

  document.querySelector(".shopping-cart").classList.add("active-cart");

  showCart();
  removeCartListener();
});

document.querySelector("#exit-cart").addEventListener("click", () => {
  document.querySelector(".shopping-cart").classList.remove("active-cart");

  const body = Array.from(document.querySelectorAll("body > :not(.shopping-cart)"));
  body.map((e) => e.classList.remove("hidden"));
});

function addItem(name, price, quantity) {
  const item = new Item(name, price, quantity);
  cart.push(item);
  saveCart(cart);
}

function saveCart(cartArr) {
  sessionStorage.setItem("cart", JSON.stringify(cartArr));
}

function showCart() {
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  let output = "";
  for (let i = 0; i < cartItems.length; i++) {
    output += `<div>${cartItems[i].name}</div>
    <div>${cartItems[i].price}</div>
    <div>${cartItems[i].quantity}</div>
    <div><button class="remove-cart-item" id="${cartItems[i].name}">x</button></div>`;
  }
  document.querySelector(".cart-items").innerHTML = output;
}

function removeCartListener() {
  const remove = document.querySelectorAll(".remove-cart-item");
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", (e) => {
      cart = cart.filter((obj) => obj.name !== e.target.id);
      saveCart(cart);
      showCart();
    });
  }
}

/* populate main products */

function populateProducts(arr, price) {
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    html += `<div class="flex-item">
                <div class="product-info" id="product-${arr[i]}" data-name="product-${arr[i]}"
                    data-price="${price[i]}">
                    Product Image ${arr[i].charAt(0).toUpperCase()}${arr[i].slice(1)}
                </div>
                <div class="price" id="product-${arr[i]}">
                    $${price[i]}
                </div>
                <button class="add" id="product-${arr[i]}">Add to Cart</button>
            </div>`;
  }
  document.querySelector(".products").innerHTML = html;
}

if (window.location.pathname.includes("womens.html")) {
  const arr = ["one", "two", "three", "four", "five", "six"];
  const price = ["29.29", "19.99", "12.99", "89.99", "99.99", "37.99"];
  populateProducts(arr, price);
  addToCartListener();
}

if (window.location.pathname.includes("mens.html")) {
  const arr = ["seven", "eight", "nine", "ten", "eleven", "twelve"];
  const price = ["29.29", "19.99", "12.99", "89.99", "99.99", "37.99"];
  populateProducts(arr, price);
  addToCartListener();
}
