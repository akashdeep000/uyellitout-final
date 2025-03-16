"use client";

import { getBookings } from "@/actions/booking";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import hash from "hash-it";
import { CalendarIcon, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

// Define the type for cursor pagination
type PaginationParams = {
    nextPage: number | null;
} | null | undefined;

export default function Page() {
    const [isScheduled, setIsScheduled] = useState(false);
    const [sortBy, setSortBy] = useState<"createdAt" | "time">("createdAt");
    const [limit, setLimit] = useState(1);
    const [page, setPage] = useState(0);
    const [lastConfigHash, setLastConfigHash] = useState<number | undefined>();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [dateCRange, setDateCRange] = useState<DateRange | undefined>();

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [cCalendarOpen, setCCalendarOpen] = useState(false);

    // Debounce search term to avoid too many requests
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ["booking-payments", isScheduled, sortBy, dateRange, dateCRange, limit, debouncedSearchTerm],
        queryFn: async ({ pageParam }: { pageParam: PaginationParams }) => {
            const data = await getBookings({
                page: pageParam?.nextPage || 1,
                limit: limit,
                from: dateRange?.from,
                to: dateRange?.to,
                createdFrom: dateCRange?.from,
                createdTo: dateCRange?.to,
                sortBy: sortBy,
                onlyScheduled: isScheduled ? "true" : "false",
                search: debouncedSearchTerm
            });
            const configHash = hash([limit, dateRange, dateCRange, sortBy, isScheduled, debouncedSearchTerm]);
            if (configHash !== lastConfigHash) {
                setLastConfigHash(hash([limit, dateRange, dateCRange, sortBy, isScheduled, debouncedSearchTerm]));
                setPage(1);
            } else {
                setPage(page + 1);
            }
            return data;
        },
        initialPageParam: null as PaginationParams,
        getNextPageParam: (lastPage) =>
            lastPage.pagination.hasNextPage ? { nextPage: lastPage.pagination.nextPage } : undefined,
    });

    useEffect(() => {
        const configHash = hash([limit, dateRange, dateCRange, sortBy, isScheduled, debouncedSearchTerm]);
        if (configHash !== lastConfigHash) {
            setLastConfigHash(hash([limit, dateRange, dateCRange, sortBy, isScheduled, debouncedSearchTerm]));
            setPage(1);
        }
    }, [limit, dateRange, dateCRange, sortBy, isScheduled, debouncedSearchTerm, lastConfigHash]);

    // Handle date range change
    const handleDateCRangeChange = (range: DateRange | undefined) => {
        // Get the start of the day (00:00:00) in the local time zone
        const startOfDay = range?.from ? new Date(range?.from.setHours(0, 0, 0, 0)) : undefined;
        // Get the end of the day (23:59:59) in the local time zone
        const endOfDay = range?.to ? new Date(range.to.setHours(23, 59, 59, 999)) : undefined;
        setDateCRange({
            from: startOfDay,
            to: endOfDay
        });
        if (range?.from && range?.to) {
            setCCalendarOpen(false);
            // Refetch data with new date range
            setTimeout(() => refetch(), 100);
        }
    };

    // Set preset date ranges
    const selectCToday = () => {
        // Get the current date and time in the local time zone
        const currentDate = new Date();
        // Get the start of the day (00:00:00) in the local time zone
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        // Get the end of the day (23:59:59) in the local time zone
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
        setDateCRange({ from: startOfDay, to: endOfDay });
        setCCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectCLastWeek = () => {
        const today = new Date();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const from = addDays(endOfDay, -7);
        setDateCRange({ from, to: endOfDay });
        setCCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectCLastMonth = () => {
        const today = new Date();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        setDateCRange({ from, to: endOfDay });
        setCCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectCCurrentMonth = () => {
        const today = new Date();
        const from = new Date(today.getFullYear(), today.getMonth(), 1);
        const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setDateCRange({ from, to });
        setCCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };



    // Handle date range change
    const handleDateRangeChange = (range: DateRange | undefined) => {
        // Get the start of the day (00:00:00) in the local time zone
        const startOfDay = range?.from ? new Date(range?.from.setHours(0, 0, 0, 0)) : undefined;
        // Get the end of the day (23:59:59) in the local time zone
        const endOfDay = range?.to ? new Date(range.to.setHours(23, 59, 59, 999)) : undefined;
        setDateRange({
            from: startOfDay,
            to: endOfDay
        });
        if (range?.from && range?.to) {
            setCalendarOpen(false);
            // Refetch data with new date range
            setTimeout(() => refetch(), 100);
        }
    };

    // Set preset date ranges
    const selectToday = () => {
        // Get the current date and time in the local time zone
        const currentDate = new Date();
        // Get the start of the day (00:00:00) in the local time zone
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        // Get the end of the day (23:59:59) in the local time zone
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
        setDateRange({ from: startOfDay, to: endOfDay });
        setCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectLastWeek = () => {
        const today = new Date();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const from = addDays(endOfDay, -7);
        setDateRange({ from, to: endOfDay });
        setCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectLastMonth = () => {
        const today = new Date();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        setDateRange({ from, to: endOfDay });
        setCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };

    const selectCurrentMonth = () => {
        const today = new Date();
        const from = new Date(today.getFullYear(), today.getMonth(), 1);
        const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setDateRange({ from, to });
        setCalendarOpen(false);
        setTimeout(() => refetch(), 100);
    };




    // Handle limit change
    const handleLimitChange = (value: string) => {
        setLimit(Number(value));
        setTimeout(() => refetch(), 100);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm("");
        setTimeout(() => refetch(), 100);
    };
    console.log({
        page,
        pages: data?.pages
    });


    return (
        <AdminPageWrapper className="space-y-4" breadcrumb={[{ title: "Bookings" }]}>
            <div className="space-y-6 p-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-lg font-semibold">Bookings Schedule</h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant={sortBy === "createdAt" ? "default" : "outline"}
                            onClick={() => setSortBy("createdAt")}
                            size="sm"
                        >
                            Sort by Created
                        </Button>

                        <Button
                            variant={sortBy === "time" ? "default" : "outline"}
                            onClick={() => setSortBy("time")}
                            size="sm"
                        >
                            Sort by Schedule
                        </Button>
                        <div className="flex items-center gap-1 border px-2 py-1.5 rounded">
                            <p className="text-xs">Only sheduled:</p> <Switch checked={isScheduled} onCheckedChange={() => setIsScheduled(!isScheduled)} />
                        </div>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button disabled={!isScheduled} variant="outline" size="sm" className="justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" /> Sheduled at:
                                    {dateRange?.from ? (
                                        <span>
                                            {dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )}
                                        </span>
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <div className="p-3 space-y-3 border-b">
                                    <h3 className="text-sm font-medium">Date Range</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Button size="sm" variant="outline" onClick={() => {
                                            setDateCRange(undefined);
                                            setTimeout(() => refetch(), 100);
                                        }}>Clear</Button>
                                        <Button size="sm" variant="outline" onClick={selectToday}>Today</Button>
                                        <Button size="sm" variant="outline" onClick={selectLastWeek}>Last 7 days</Button>
                                        <Button size="sm" variant="outline" onClick={selectLastMonth}>Last month</Button>
                                        <Button size="sm" variant="outline" onClick={selectCurrentMonth}>This month</Button>
                                    </div>
                                </div>
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={handleDateRangeChange}
                                    numberOfMonths={2}
                                    className="p-3"
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover open={cCalendarOpen} onOpenChange={setCCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" /> Created at:
                                    {dateCRange?.from ? (
                                        <span>
                                            {dateCRange.to ? (
                                                <>
                                                    {format(dateCRange.from, "LLL dd, y")} - {format(dateCRange.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateCRange.from, "LLL dd, y")
                                            )}
                                        </span>
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <div className="p-3 space-y-3 border-b">
                                    <h3 className="text-sm font-medium">Date Range</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Button size="sm" variant="outline" onClick={() => {
                                            setDateCRange(undefined);
                                            setTimeout(() => refetch(), 100);
                                        }}>Clear</Button>
                                        <Button size="sm" variant="outline" onClick={selectCToday}>Today</Button>
                                        <Button size="sm" variant="outline" onClick={selectCLastWeek}>Last 7 days</Button>
                                        <Button size="sm" variant="outline" onClick={selectCLastMonth}>Last month</Button>
                                        <Button size="sm" variant="outline" onClick={selectCCurrentMonth}>This month</Button>
                                    </div>
                                </div>
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateCRange?.from}
                                    selected={dateCRange}
                                    onSelect={handleDateCRangeChange}
                                    numberOfMonths={2}
                                    className="p-3"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full sm:w-72">
                        <Label htmlFor="search">Search</Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search by name, email, phone..."
                                className="pl-8 pr-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="absolute right-2 top-2.5"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-full sm:w-40">
                        <Label htmlFor="limit">Items per page</Label>
                        <Select
                            value={limit.toString()}
                            onValueChange={handleLimitChange}
                        >
                            <SelectTrigger id="limit">
                                <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Created at</TableHead>
                                <TableHead>Schedule at</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Product Type</TableHead>
                                <TableHead>Message</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.pages[page - 1]?.data?.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.createdAt.toLocaleString()}</TableCell>
                                    <TableCell className="font-medium">{booking.time?.toLocaleString() || "Not scheduled"}</TableCell>
                                    <TableCell>{booking.name}</TableCell>
                                    <TableCell>{booking.email}</TableCell>
                                    <TableCell>{booking.phoneNumber}</TableCell>
                                    <TableCell>{booking.age}</TableCell>
                                    <TableCell>{booking.productName}</TableCell>
                                    <TableCell>{booking.price}</TableCell>
                                    <TableCell>{booking.productType}</TableCell>
                                    <TableCell>{booking.message || "N/A"}</TableCell>
                                </TableRow>
                            ))}

                            {(isLoading || !data) && Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 10 }).map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-6 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                            {data?.pages[0]?.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                                        No bookings found for the selected filters
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            {data?.pages[0]?.pagination.totalCount !== undefined
                                ? `Total: ${data.pages[0].pagination.totalCount} bookings`
                                : ""}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {data?.pages[0]?.pagination.totalCount !== undefined
                                ? `Page: ${page} of ${Math.floor(data.pages[0].pagination.totalCount / limit)}`
                                : ""}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                                disabled={!(page > 1)}
                                variant="outline"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log({ page });
                                    console.log({ hasNextPage });
                                    console.log({ isFetchingNextPage });
                                    if (page === data?.pages.length) {
                                        console.log("fetching...");
                                        fetchNextPage();
                                    } else {
                                        console.log("not fetching...");
                                        setPage(page + 1);
                                    }
                                }}
                                disabled={(!hasNextPage || isFetchingNextPage) && (page === data?.pages.length)}
                                variant="outline"
                            >
                                {isFetchingNextPage
                                    ? "Loading..."
                                    : "Next"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}