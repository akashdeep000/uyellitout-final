"use client";

import { getHistoricalBookingsUser, getNotSheduledBookingsUser, getUpcomingBookingsUser } from "@/actions/booking";
import { ResheduleBooking } from "@/components/bookings/reshedule-booking";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function BookingsPage() {
    const { ref, inView } = useInView();

    const { data: upcomingBookings, isLoading: upcomingBookingsLoading } = useQuery({
        queryKey: ["upcoming-bookings"],
        queryFn: () => getUpcomingBookingsUser()
    });

    const { data: notScheduledBookings, isLoading: notScheduledBookingsLoading } = useQuery({
        queryKey: ["not-scheduled-bookings"],
        queryFn: () => getNotSheduledBookingsUser()
    });

    const {
        data: historicalBookings,
        isLoading: historicalBookingsLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["historical-bookings"],
        queryFn: ({ pageParam = 1 }) => getHistoricalBookingsUser({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    const allHistoricalBookings = historicalBookings?.pages.flatMap(page => page) || [];

    const canReschedule = (date: Date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        const diffTime = Math.abs(bookingDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 1;
    };

    return (
        <div className="space-y-8 p-3">
            <div className="max-w-[100svw]">
                <h2 className="text-xl mb-4">Upcoming Bookings</h2>
                <Table className="max-w-[100svw]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booked for</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Paid at</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {upcomingBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="space-y-2">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} className="w-full h-8 rounded" />
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {upcomingBookings?.length === 0 && !upcomingBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                        {upcomingBookings?.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.productName}</TableCell>
                                <TableCell>{new Date(booking.time!).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(booking.time!).toLocaleTimeString()}</TableCell>
                                <TableCell>{new Date(booking.createdAt!).toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    {canReschedule(booking.time!) && (
                                        <ResheduleBooking id={booking.id}>
                                            <Button variant="secondary" size="sm">Reschedule</Button>
                                        </ResheduleBooking>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="max-w-[100svw]">
                <h2 className="text-xl mb-4">Not Scheduled Bookings</h2>
                <Table className="max-w-[100svw]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booked for</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Paid at</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notScheduledBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="space-y-2">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} className="w-full h-8 rounded" />
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {notScheduledBookings?.length === 0 && !notScheduledBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                        {notScheduledBookings?.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.productName}</TableCell>
                                <TableCell>Not yet sheduled</TableCell>
                                <TableCell>Not yet sheduled</TableCell>
                                <TableCell>{new Date(booking.createdAt!).toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    <ResheduleBooking id={booking.id}>
                                        <Button variant="secondary" size="sm">Schedule Now</Button>
                                    </ResheduleBooking>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="max-w-[100svw]">
                <h2 className="text-xl mb-4">Historical Bookings</h2>
                <Table className="max-w-[100svw]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booked for</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Paid at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {historicalBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div className="space-y-2">
                                        {Array.from({ length: 2 }).map((_, i) => (
                                            <Skeleton key={i} className="w-full h-8 rounded" />
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {allHistoricalBookings.length === 0 && !historicalBookingsLoading && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allHistoricalBookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.productName}</TableCell>
                                <TableCell>{new Date(booking.time!).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(booking.time!).toLocaleTimeString()}</TableCell>
                                <TableCell>{new Date(booking.createdAt!).toLocaleString()}{booking.status === "cancelled" ? " (Cancelled)" : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Loading indicator */}
                <div ref={ref} className="flex justify-center py-4">
                    {isFetchingNextPage && (
                        <div className="space-y-2">
                            <Skeleton className="w-full h-8 rounded" />
                            <Skeleton className="w-full h-8 rounded" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}