export const formatToPercentage = (decimal: number, decimals: number = 2): string => {
  if (typeof decimal !== "number") {
    throw new Error("Input must be a number");
  }

  return (decimal * 100).toFixed(decimals) + "%";
};

export function parseAgentResponse(rawData: string): string {
  const cleaned = rawData
    .split("\n")
    .filter((line) => line.startsWith("event: token data:"))
    .map((line) => line.replace("event: token data:", "").trim())
    .join("");

  return cleaned;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
