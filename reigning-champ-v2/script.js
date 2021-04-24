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
exitSearchBtn.addEventListener("click", () => closeSearchBar(".mobile-nav"));
exitSearchBtn.addEventListener("click", () => closeSearchBar(".main-nav-items"));

// show search bar
document
  .querySelector("#magnifyDesktop")
  .addEventListener("click", () => showSearchBar(".main-nav-items", ".main-nav"));
document
  .querySelector("#magnify")
  .addEventListener("click", () => showSearchBar(".mobile-nav", ".top"));

// hamburger menu
document.querySelector(".hamburger").addEventListener("click", () => {
  const navbar = document.querySelector(".main-nav");
  navbar.classList.toggle("active");

  let navLinks = Array.from(document.querySelectorAll(".nav-links"));
  navLinks = navLinks.filter((e) => !e.classList.contains("nav-item"));
  navLinks.map((ele) => ele.classList.toggle("active"));
});

// scrolling
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".top").style.height = "8vh";
    document.querySelector(".main-nav").style.height = "8vh";
  } else {
    document.querySelector(".top").style.height = "10vh";
    document.querySelector(".main-nav").style.height = "10vh";
  }
});

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
