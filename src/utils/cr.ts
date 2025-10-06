import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cr (class resolver): build className strings with Tailwind-aware merging.
 * Usage: <div className={cr("p-2", condition && "p-4", ["text-sm", other])} />
 */
export function cr(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export default cr;
