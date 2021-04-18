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

const searchBar = document.createElement("input");
setAttributes(searchBar, searchBarAttrs);

const closeSearchBar = document.createElement("button");
setAttributes(closeSearchBar, closeSearchBarAttrs);
closeSearchBar.innerHTML = "x";

closeSearchBar.addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  navItems.map((ele) => ele.classList.remove("hidden"));
  document.querySelector(".logo").style.display = "";

  searchBar.classList.add("hidden");
  closeSearchBar.classList.add("hidden");
});

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("nav").style.height = "80px";
  } else {
    document.querySelector("nav").style.height = "120px";
  }
});

document.querySelector("#magnify").addEventListener("click", () => {
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  navItems.map((ele) => ele.classList.add("hidden"));

  document.querySelector(".logo").style.display = "none";

  const container = document.querySelector(".search-container");

  container.appendChild(searchBar);
  container.appendChild(closeSearchBar);

  searchBar.classList.remove("hidden");
  closeSearchBar.classList.remove("hidden");
});

function setAttributes(ele, attrsObj) {
  for (let key in attrsObj) {
    ele.setAttribute(key, attrsObj[key]);
  }
}
