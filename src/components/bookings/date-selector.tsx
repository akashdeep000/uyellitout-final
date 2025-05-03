"use client";

import { getNext30DaysAvailableDays } from "@/actions/booking";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn, convertDateSlots } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type DateSelectorProps = {
	selected: Date;
	onSelect: (date: Date | undefined) => void;
};

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
	const {
		data: availability,
		isLoading: availabilityLoading,
		refetch,
	} = useQuery({
		queryKey: ["availability"],
		queryFn: async () => {
			const data = await getNext30DaysAvailableDays();
			return convertDateSlots(data, 0, -new Date().getTimezoneOffset());
		},
	});

	return (
		<Popover onOpenChange={(open) => open && refetch()}>
			<PopoverTrigger disabled={availabilityLoading} asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!selected && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selected ? (
						format(selected, "PPP")
					) : (
						<span>
							{availabilityLoading ? "Loading availibility..." : "Pick a date"}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 z-[99999999]">
				<Calendar
					className="w-full"
					mode="single"
					selected={selected}
					onSelect={onSelect}
					initialFocus
					disabled={(date) => {
						const day = availability?.find(
							(d) =>
								new Date(d.date).toLocaleDateString() ===
								date.toLocaleDateString(),
						);
						return (
							!day ||
							day?.slots.filter((slot) =>
								[slot + 1, slot + 2, slot + 3].every((slot) =>
									day.slots.includes(slot),
								),
							).length === 0
						);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
