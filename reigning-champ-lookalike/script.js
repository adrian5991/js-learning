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

// exit search bar on click
closeSearchBar.addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".touch-wrapper"));
  navItems.map((ele) => (ele.style.display = ""));

  document.querySelector(".logo").style.display = "";

  searchBar.style.display = "none";
  closeSearchBar.style.display = "none";
});

// show search bar
document.querySelector("#magnify").addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".touch-wrapper"));
  navItems.map((ele) => (ele.style.display = "none"));

  document.querySelector(".logo").style.display = "none";

  const container = document.querySelector(".search-container");

  container.appendChild(searchBar);
  container.appendChild(closeSearchBar);

  searchBar.style.display = "";
  closeSearchBar.style.display = "";
});

// hamburger menu
document.querySelector("#icon").addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".nav-wrapper"));
  navItems.map((ele) => {
    if (Array.from(ele.classList).includes("active")) {
      ele.classList.remove("active");
      ele.classList.remove("responsive");
    } else {
      ele.classList.add("responsive");
      ele.classList.add("active");
    }
  });
});

// scrolling
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("nav").style.height = "6vh";
  } else {
    document.querySelector("nav").style.height = "10vh";
  }
});

function setAttributes(ele, attrsObj) {
  for (let key in attrsObj) {
    ele.setAttribute(key, attrsObj[key]);
  }
}
