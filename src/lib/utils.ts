import { clsx, type ClassValue } from "clsx";
import { addDays, addMinutes } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const converterToHappiness = (matric: "happiness" | "anxiety" | "stress" | "mood" | "intimacy" | null, value: number) => {
  switch (matric) {
    case "happiness":
      return value;
    case "anxiety":
      return anxietyToHappiness(value);
    case "stress":
      return stressToHappiness(value);
    case "mood":
      return moodToHappiness(value);
    default:
      return value;
  }
};

export const converterFromHappiness = (matric: "happiness" | "anxiety" | "stress" | "mood" | "intimacy" | null, value: number) => {
  switch (matric) {
    case "happiness":
      return value;
    case "anxiety":
      return happinessToAnxiety(value);
    case "stress":
      return happinessToStress(value);
    case "mood":
      return happinessToMood(value);
    default:
      return value;
  }
};

export const happinessToAnxiety = (happiness: number) => {
  return ((98 - happiness) * 1.023) + 12;
};

export const happinessToStress = (happiness: number) => {
  return ((98 - happiness) * 0.988) + 15;
};

export const happinessToMood = (happiness: number) => {
  return ((98 - happiness) * 1.011) + 13;
};

export const anxietyToHappiness = (anxiety: number) => {
  return 98 - ((anxiety - 12) / 1.023);
};

export const stressToHappiness = (stress: number) => {
  return 98 - ((stress - 15) / 0.988);
};

export const moodToHappiness = (mood: number) => {
  return 98 - ((mood - 13) / 1.011);
};


export const slotToTime = (slot: number) => {
  const hour = Math.floor(slot / 4);
  const minute = ((slot % 4) * 15);
  return `${(hour > 12 ? hour - 12 : hour).toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
};

export function convertToDate(date: Date, slot: number): Date {
  date.setHours(0, 0, 0, 0);
  return addMinutes(date, (slot * 15));
}

type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type DaySlots = {
  day: Day,
  slots: number[];
};

type ConvertedDaySlots = Record<Day, number[]>;


interface DateSlots {
  date: Date;
  slots: number[];
}

type ConvertedDateSlots = Record<string, DateSlots>;


const daysOfWeek: readonly Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/**
* Converts multiple DaySlots to a specified timezone.
* @param daySchedules - Array of DaySlots to convert.
* @param sourceOffset - The original timezone offset in minutes (e.g., 0 for UTC, 330 for IST).
* @param targetOffset - The target timezone offset in minutes (e.g., 330 for IST, 0 for UTC).
* @returns An array of converted DaySlots.
*/
export function convertDaySlots(
  daySchedules: DaySlots[],
  sourceOffset: number,
  targetOffset: number
): DaySlots[] {
  const result: ConvertedDaySlots = {
    sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: []
  };

  for (const daySchedule of daySchedules) {
    for (const slot of daySchedule.slots) {
      const minutes = slot * 15;
      const convertedMinutes = (minutes - sourceOffset + targetOffset);
      if (convertedMinutes < 0) {
        const prevDay = daysOfWeek[(daysOfWeek.indexOf(daySchedule.day) + 6) % 7];
        result[prevDay].push((1440 + convertedMinutes) / 15);
      } else if (convertedMinutes >= 1440) {
        const nextDay = daysOfWeek[(daysOfWeek.indexOf(daySchedule.day) + 1) % 7];
        result[nextDay].push((convertedMinutes - 1440) / 15);
      } else {
        result[daySchedule.day].push(convertedMinutes / 15);
      }
    }
  }

  return Object.entries(result).map(([day, slots]) => ({ day: day as Day, slots }));
}

/**
* Converts multiple DateSlots to a specified timezone.
* @param blockedDates - Array of DateSlots to convert.
* @param sourceOffset - The original timezone offset in minutes (e.g., 0 for UTC).
* @param targetOffset - The target timezone offset in minutes (e.g., 330 for IST).
* @returns An array of converted DateSlots.
*/
export function convertDateSlots(
  dates: DateSlots[],
  sourceOffset: number,
  targetOffset: number
): DateSlots[] {
  const result: ConvertedDateSlots = {};

  for (const date of dates) {
    for (const slot of date.slots) {
      const minutes = slot * 15;
      const convertedMinutes = (minutes - sourceOffset + targetOffset);

      const convertedDate = addMinutes(date.date, - sourceOffset + targetOffset);

      if (convertedMinutes < 0) {
        const dateKey = addDays(convertedDate, -1).toISOString().split("T")[0];
        if (!result[dateKey]) result[dateKey] = {
          date: addDays(date.date, -1),
          slots: []
        };
        result[dateKey].slots.push((1440 + convertedMinutes) / 15);

      } else if (convertedMinutes >= 1440) {
        const dateKey = addDays(convertedDate, + 1).toISOString().split("T")[0];
        if (!result[dateKey]) result[dateKey] = {
          date: addDays(date.date, + 1),
          slots: []
        };
        result[dateKey].slots.push((convertedMinutes - 1440) / 15);

      } else {
        const dateKey = convertedDate.toISOString().split("T")[0];
        if (!result[dateKey]) result[dateKey] = {
          date: date.date,
          slots: []
        };
        result[dateKey].slots.push(convertedMinutes / 15);
      }
    }
  }
  console.log({
    in: dates,
    sourceOffset,
    targetOffset,
    out: Object.entries(result).map(([, slots]) => (slots))
  });

  return Object.entries(result).map(([, slots]) => (slots));
}