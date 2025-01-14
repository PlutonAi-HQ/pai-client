export const formatToPercentage = (decimal: number, decimals: number = 2): string => {
  if (typeof decimal !== "number") {
    throw new Error("Input must be a number");
  }

  // Multiply the decimal by 100 and format it with the specified number of decimal places
  return (decimal * 100).toFixed(decimals) + "%";
};
