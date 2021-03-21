export function regularSplit() {
  const str = document.getElementById("text-to-format").value;
  let newStr = str
    .replace("\n", " ")
    .replace("\r", " ")
    .replace("\t", " ")
    .split(" ")
    .map((ele) => `'${ele}',`)
    .join("")
    .slice(0, -1);
  document.getElementById("formatted-text").value = newStr;
  console.log("regular split success!");
  return newStr;
}

export function regexSplit(numOfChars) {
  const str = document.getElementById("text-to-format").value;
  let newStr = str
    .replace(/\W/g, "")
    .match(new RegExp(".{1," + numOfChars + "}", "g"))
    .map((ele) => `'${ele}',`)
    .join("")
    .slice(0, -1);
  document.getElementById("formatted-text").value = newStr;
  console.log("Regex split called");
  return newStr;
}

export function getSkusOnly(delimiter, sku_prefix) {
  const str = document.getElementById("text-to-format").value;
  let newStr = str
    .replace(/\W/g, delimiter)
    .split(delimiter)
    .filter((ele) => ele.slice(0, 6) === sku_prefix)
    .map((ele) => `'${ele}',`)
    .join("")
    .slice(0, -1);
  document.getElementById("formatted-text").value = newStr;
  console.log("sku split called");
  return newStr;
}
