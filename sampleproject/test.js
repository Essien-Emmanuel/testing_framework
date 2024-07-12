const { filter } = require("./index");
const filtered = filter([1, 5, 3], (value) => {
  return value !== 1;
});
console.log(filtered);
