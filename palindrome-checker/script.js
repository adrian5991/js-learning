const textNode = document.querySelector("#input");
textNode.addEventListener("input", (input) => {
  document.querySelector("#answer").innerHTML = palindromeChecker(input.target.value);

  function palindromeChecker(text) {
    const arr = text.toLowerCase().split("");
    const compareArr = arr.slice();
    const newArr = [];
    function equals(a, b) {
      if (a.length === b.length && a.every((ele, ind) => ele === b[ind])) {
        return true;
      }
      return false;
    }
    for (let j = 0; j < text.length; j++) {
      newArr.push(arr.pop());
    }
    if (equals(newArr, compareArr)) {
      return "Yes";
    }
    return "Nope";
  }
});
