module.exports = {
  filter(arr, fn) {
    const newArr = [];
    for (const index in arr) {
      let value;
      if (fn(arr[index], index) === true) value = arr[index];
      if (value) newArr.push(value);
    }
    return newArr;
  },
};
