"use client";

import { getWahaQrCode, getWahaStatus, logoutWaha, restartWaha, startWaha, stopWaha } from "@/actions/waha";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function MessagesPage() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: wahaStatus, isLoading: wahaStatusLoading } = useQuery({
        queryKey: ["waha-status"],
        queryFn: getWahaStatus,
        refetchInterval: 1000
    });

    const restartWahaMutation = useMutation({
        mutationFn: restartWaha,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["waha-status"] });
            toast({
                title: "Whatsapp restarted",
            });
        },
        onError: (error) => {
            console.error("Error to restart waha:", error);
            toast({
                title: "Failed to restart whatsapp",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const startWahaMutation = useMutation({
        mutationFn: startWaha,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["waha-status"] });
            toast({
                title: "Whatsapp started",
            });
        },
        onError: (error) => {
            console.error("Error to start waha:", error);
            toast({
                title: "Failed to start whatsapp",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const stopWahaMutation = useMutation({
        mutationFn: stopWaha,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["waha-status"] });
            toast({
                title: "Whatsapp stopped",
            });
        },
        onError: (error) => {
            console.error("Error to stop waha:", error);
            toast({
                title: "Failed to stop whatsapp",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const getWahaQrCodeMutation = useMutation({
        mutationFn: getWahaQrCode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["waha-status"] });
            toast({
                title: "Whatsapp qr code generated",
            });
        },
        onError: (error) => {
            console.error("Error to generate qr code:", error);
            toast({
                title: "Failed to generate qr code",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const logoutWahaMutation = useMutation({
        mutationFn: logoutWaha,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["waha-status"] });
            toast({
                title: "Whatsapp logged out",
            });
        },
        onError: (error) => {
            console.error("Error to logout waha:", error);
            toast({
                title: "Failed to logout whatsapp",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    return (
        <AdminPageWrapper breadcrumb={[{
            title: "Settings"
        }]} className="text-gray-800">
            <h1 className="text-lg font-bold mb-4">Whatsapp settings</h1>
            {
                wahaStatusLoading && <Skeleton className="w-full h-32 rounded" />
            }
            {
                wahaStatus &&
                <Card className="p-4 grid sm:grid-cols-[1fr_auto] items-center gap-4">
                    <div className="space-y-2">
                        <p className="text-lg">Current status: <span className={cn(
                            wahaStatus.status === "STOPPED" && "text-gray-600",
                            wahaStatus.status === "WORKING" && "text-green-600",
                            wahaStatus.status === "STARTING" && "text-yellow-600",
                            wahaStatus.status === "SCAN_QR_CODE" && "text-yellow-600",
                            wahaStatus.status === "FAILED" && "text-red-600"
                        )}>{wahaStatus.status}</span></p>

                        <p>Current user: {wahaStatus.me?.id || "NULL"}</p>
                        <p>Current user name: {wahaStatus.me?.pushName || "NULL"}</p>
                        {
                            getWahaQrCodeMutation.data && wahaStatus.status === "SCAN_QR_CODE" && <img src={getWahaQrCodeMutation.data} alt="" />
                        }
                    </div>
                    <div>
                        {
                            wahaStatus.status === "FAILED" ? <Button disabled={restartWahaMutation.isPending} onClick={() => restartWahaMutation.mutate()}>{restartWahaMutation.isPending ? "Restarting..." : "Restart"}</Button> :
                                wahaStatus.status === "STOPPED" ? <Button disabled={startWahaMutation.isPending} onClick={() => startWahaMutation.mutate()}>{startWahaMutation.isPending ? "Starting..." : "Start"}</Button> :
                                    wahaStatus.status === "WORKING" ? <div className="grid gap-2">
                                        <Button disabled={stopWahaMutation.isPending} onClick={() => stopWahaMutation.mutate()}>{stopWahaMutation.isPending ? "Stopping..." : "Stop"}</Button>
                                        <Button disabled={logoutWahaMutation.isPending} onClick={() => logoutWahaMutation.mutate()}>{logoutWahaMutation.isPending ? "Logging out..." : "Logout"}</Button>
                                    </div> :
                                        wahaStatus.status === "SCAN_QR_CODE" ? <Button disabled={getWahaQrCodeMutation.isPending} onClick={() => getWahaQrCodeMutation.mutate()}>{getWahaQrCodeMutation.isPending ? "Generating QR Code..." : getWahaQrCodeMutation.data ? "Regenerate QR Code" : "Generate QR Code"}</Button> :
                                            <Button disabled>Waiting to start</Button>
                        }
                    </div>
                </Card>
            }
        </AdminPageWrapper>
    );
}