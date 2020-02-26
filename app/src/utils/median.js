// eslint-disable-next-line import/prefer-default-export
export const median = (arr, fn) => {
  const half = (arr.length / 2) | 0; // eslint-disable-line
  const temp = arr.sort(fn);

  if (temp.length % 2) {
    return temp[half];
  }

  return (temp[half - 1] + temp[half]) / 2;
};
