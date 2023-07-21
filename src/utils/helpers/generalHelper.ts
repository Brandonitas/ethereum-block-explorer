export const generateFormatNumber = (number: number = 0) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 5,
  });
};

export const formatString = (str: string): string => {
  if (str.length <= 6) {
    return str; // Si el string tiene 6 caracteres o menos, no se modifica
  } else {
    const firstThree = str.substr(0, 3);
    const lastThree = str.substr(-3);
    return `${firstThree}...${lastThree}`;
  }
};
