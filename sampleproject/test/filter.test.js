const { filter } = require("../index");
const assert = require("assert");

let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it("Should filter an array", () => {
  const filtered = filter(numbers, (value) => {
    return value !== 1;
  });

  assert.deepStrictEqual(filtered, [2, 3]);
});

it("Should check numbers length", () => {
  assert.strictEqual(numbers.length, 3);
});
