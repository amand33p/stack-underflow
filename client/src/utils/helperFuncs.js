export const filterDuplicates = (originalArr, arrToConcat) => {
  return arrToConcat.filter((a) => !originalArr.find((o) => o.id === a.id));
};
