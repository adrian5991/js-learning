export const charsObj = {
  type: "number",
  placeholder: "# of characters to split by",
  name: "numOfCharsToSplitBy",
  id: "numOfCharsToSplitBy",
};

export const skuObj = {
  type: "text",
  placeholder: "6-character SKU prefix",
  name: "skuPrefix",
  id: "skuPrefix",
  maxlength: 6,
  disabled: "",
};

export const delimiterObj = {
  name: "delimiter",
  id: "delimiter",
  disabled: "",
};

export const delimOther = {
  name: "otherDelim",
  id: "otherDelim",
  placeholder: "enter delimiter",
  type: "text",
};
export const delimiterChoices = {
  space: " ",
  comma: ",",
  tab: "  ",
  hyphen: "-",
  other: "other",
};
