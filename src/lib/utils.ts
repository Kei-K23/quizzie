import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlEntities(htmlString: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(htmlString, "text/html")
    .documentElement.textContent;
  return decodedString;
}
