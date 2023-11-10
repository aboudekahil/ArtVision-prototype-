import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cm = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cm;
