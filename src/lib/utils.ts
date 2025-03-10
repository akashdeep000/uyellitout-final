import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const converterToHappiness = (matric: "happiness" | "anxity" | "stress" | "mood" | "intimacy" | null, value: number) => {
  switch (matric) {
    case "happiness":
      return value;
    case "anxity":
      return anxityToHappiness(value);
    case "stress":
      return stressToHappiness(value);
    case "mood":
      return moodToHappiness(value);
    default:
      return value;
  }
};

export const happinessToAnxity = (happiness: number) => {
  return ((98 - happiness) * 1.023) + 12;
};

export const happinessToStress = (happiness: number) => {
  return ((98 - happiness) * 0.988) + 15;
};

export const happinessToMood = (happiness: number) => {
  return ((98 - happiness) * 1.011) + 13;
};

export const anxityToHappiness = (anxity: number) => {
  return 98 - ((anxity - 12) / 1.023);
};

export const stressToHappiness = (stress: number) => {
  return 98 - ((stress - 15) / 0.988);
};

export const moodToHappiness = (mood: number) => {
  return 98 - ((mood - 13) / 1.011);
};