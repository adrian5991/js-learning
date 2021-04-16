const textNode = document.querySelector("#input");
textNode.addEventListener("input", (input) => {
  document.querySelector("#answer").innerHTML = palindromeChecker(input.target.value);

  function palindromeChecker(text) {
    const arr = text.toLowerCase().replace(/[\W_]/g, "");
    const compareArr = arr.split("");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != compareArr.pop()) {
        return false;
      }
    }
    return true;
  }
});
