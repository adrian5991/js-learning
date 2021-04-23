const searchBarAttrs = {
  type: "text",
  class: "search-bar hidden",
  placeholder: "Search Products",
  name: "Search Bar",
};

const closeSearchBarAttrs = {
  class: "search-bar hidden",
  id: "exit-search",
};

// search bar
const searchBar = document.createElement("input");
setAttributes(searchBar, searchBarAttrs);

// exit search bar button
const closeSearchBar = document.createElement("button");
setAttributes(closeSearchBar, closeSearchBarAttrs);
closeSearchBar.innerHTML = "x";

document.querySelector(".hamburger").addEventListener("click", () => {
  const navbar = document.querySelector(".main-nav");
  navbar.classList.toggle("active");

  let navItems = Array.from(document.querySelectorAll(".nav-links"));
  navItems = navItems.filter((e) => !e.classList.contains("nav-item"));
  navItems.map((ele) => ele.classList.toggle("active"));
});

// scrolling
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".top").style.height = "7vh";
    document.querySelector(".search-container").style.height = "7vh";
  } else {
    document.querySelector(".top").style.height = "10vh";
    document.querySelector(".search-container").style.height = "10vh";
  }
});

// exit search bar on click
closeSearchBar.addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".top"));
  navItems.map((ele) => (ele.style.display = "flex"));

  // document.querySelector(".logo").style.display = "";

  searchBar.style.display = "none";
  closeSearchBar.style.display = "none";
});

// show search bar
document.querySelector("#magnify").addEventListener("click", () => {
  // const navItems = Array.from(document.querySelectorAll(".top"));
  // navItems.map((ele) => (ele.style.display = "none"));
  const navItems = document.querySelector(".top");
  navItems.style.display = "none";

  const container = document.querySelector(".search-container");
  container.style.display = "flex";

  container.appendChild(searchBar);
  container.appendChild(closeSearchBar);

  searchBar.style.display = "";
  closeSearchBar.style.display = "";
});

function setAttributes(ele, attrsObj) {
  for (let key in attrsObj) {
    ele.setAttribute(key, attrsObj[key]);
  }
}
