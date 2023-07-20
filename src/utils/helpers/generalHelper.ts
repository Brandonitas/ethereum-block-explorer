export const generateFormatNumber = (number: number = 0) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 5,
  });
};
