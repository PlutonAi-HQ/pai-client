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

export function splitURL(url: string): {
  baseURL: string;
  params: string;
  searchParams: Record<string, string>;
} {
  const [baseWithParams, searchParams] = url.split("?");
  const baseParts = baseWithParams.split("/");
  const baseURL = baseParts.slice(0, -1).join("/");
  const extractedParams = baseParts.pop() || "";

  const searchParamsObj: Record<string, string> = {};
  if (searchParams) {
    searchParams.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      searchParamsObj[key] = value || "";
    });
  }

  return {
    baseURL,
    params: extractedParams,
    searchParams: searchParamsObj,
  };
}

export function formatWalletAddress(address: string): string {
  if (address.length <= 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function isEmptyString(str?: string): boolean {
  return !str || str.trim() === "";
}
