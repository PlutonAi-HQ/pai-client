export const formatToPercentage = (
  decimal: number,
  decimals: number = 2,
): string => {
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

export function generateSessionId() {
  return crypto.randomUUID();
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return words
    .slice(-2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function getLastName(fullName: string): string {
  const nameParts = fullName.trim().split(" ");
  return nameParts[nameParts.length - 1];
}

export function handleStreamEventData(chunk: string) {
  const chunkArray = chunk.split("\n");

  const transformedArray: string[] = [];

  for (let index = 0; index < chunkArray.length - 1; index++) {
    const line = chunkArray[index];
    if (index > 0) {
      if (chunkArray[index - 1].startsWith("data:") && line === "") continue;
    }

    if (line.startsWith("event: ")) {
      if (line.replace("event: ", "") === "end") {
        break; // Break the loop when 'event: end' is encountered
      }
      continue;
    }

    if (line.startsWith("data:")) {
      transformedArray.push(line.replace(/^data: /, "").trimEnd());
      continue;
    }

    transformedArray.push(line);
  }

  const finalTransformedArray = transformedArray.map((word) =>
    word === "" ? "\n" : word,
  );

  const result = finalTransformedArray.join("");

  return result;
}
