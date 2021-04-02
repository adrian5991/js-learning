import * as obj from "./objects.js";
import * as split from "./splitFunctions.js";

/*
Topics covered in this project:
  - DOM manipulation using getElementById, addEventListener, etc.
  - creating elements in the DOM using javascript
*/

// Empty divs
const rowTwo = document.getElementById("row-2");
const rowThree = document.getElementById("row-3");
const rowFour = document.getElementById("row-4");

// Create optional inputs
const numOfCharsInput = document.createElement("input");
const skuPrefixInput = document.createElement("input");
const delimiterInput = document.createElement("select");
const otherDelim = document.createElement("input");
for (let key in obj.delimiterChoices) {
  let option = document.createElement("option");
  option.text = key;
  delimiterInput.add(option);
}

// Set attributes of optional inputs
setAttributes(numOfCharsInput, obj.charsObj);
rowTwo.appendChild(numOfCharsInput);
setAttributes(skuPrefixInput, obj.skuObj);
rowThree.appendChild(skuPrefixInput);
setAttributes(delimiterInput, obj.delimiterObj);
rowThree.appendChild(delimiterInput);
setAttributes(otherDelim, obj.delimOther);
rowFour.appendChild(otherDelim);
otherDelim.style.visibility = "hidden";

// Buttons
const regexSplitButton = document.getElementById("regexSplit");
const regularSplitButton = document.getElementById("regularSplit");
const skuSplitButton = document.getElementById("skuSplit");
const delimiter = document.getElementById("delimiter");

// Event listeners
regexSplitButton.addEventListener("click", splitHandler);
regularSplitButton.addEventListener("click", splitHandler);
skuSplitButton.addEventListener("click", splitHandler);
delimiter.addEventListener("change", other);
document.getElementById("formatButton").addEventListener("click", format);

// functions
function other() {
  if (delimiter.value === "other") {
    otherDelim.style.visibility = "visible";
  } else {
    otherDelim.style.visibility = "hidden";
  }
}

function format() {
  if (regexSplitButton.checked) {
    const numChars = document.getElementById("numOfCharsToSplitBy").value;
    console.log(numChars);
    if (parseInt(numChars) === 0 || numChars === "") {
      alert("Must not be 0 or empty");
    } else {
      split.regexSplit(numChars);
    }
  } else if (regularSplitButton.checked) {
    split.regularSplit();
  } else {
    const skuPrefix = document.getElementById("skuPrefix").value;
    split.getSkusOnly(obj.delimiterChoices[delimiter.value], skuPrefix);
  }
}

function splitHandler() {
  if (regexSplitButton.checked) {
    skuPrefixInput.setAttribute("disabled", "");
    delimiterInput.setAttribute("disabled", "");
    otherDelim.setAttribute("disabled", "");
    numOfCharsInput.removeAttribute("disabled");
  } else if (skuSplitButton.checked) {
    numOfCharsInput.setAttribute("disabled", "");
    skuPrefixInput.removeAttribute("disabled");
    delimiterInput.removeAttribute("disabled");
    otherDelim.removeAttribute("disabled");
  } else {
    skuPrefixInput.setAttribute("disabled", "");
    delimiterInput.setAttribute("disabled", "");
    otherDelim.setAttribute("disabled", "");
    numOfCharsInput.setAttribute("disabled", "");
  }
}

function setAttributes(ele, attrsObj) {
  for (let key in attrsObj) {
    ele.setAttribute(key, attrsObj[key]);
  }
}
