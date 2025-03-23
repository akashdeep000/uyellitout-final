"use server";

import { env } from "@/env";

export const getWahaStatus = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sessions/default`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.json();
    return data as {
        name: string;
        status: "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";
        me: {
            id: string;
            pushName: string;
        } | null;
    };
};

export const startWaha = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sessions/default/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.json();
    return data as {
        name: string;
        status: "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";
    };
};

export const stopWaha = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sessions/default/stop`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.json();
    return data as {
        name: string;
        status: "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";
    };
};

export const restartWaha = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sessions/default/restart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.json();
    return data as {
        name: string;
        status: "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";
    };
};

export const getWahaQrCode = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/default/auth/qr?format=image`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const buffer = await res.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64Image}`;
};

export const getWahaQrCodeBase64 = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/default/auth/qr?format=image`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.text();
    return `data:image/png;base64,${data}`;
};


export const logoutWaha = async () => {
    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sessions/default/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
    });
    const data = await res.json();
    return data as {
        name: string;
        status: "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";
    };
};


export const sendWahaMessage = async (to: string, message: string) => {

    const res = await fetch(`${env.WHATSAPP_API_URL}/api/sendText`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": env.WHATSAPP_API_KEY || "",
        },
        body: JSON.stringify({
            "chatId": `${to.replace("+", "")}@c.us`,
            "reply_to": null,
            "text": message,
            "linkPreview": true,
            "linkPreviewHighQuality": false,
            "session": "default"
        }),
    });
    const data = await res.json();
    return data as {
        id: string;
        to: string;
    };
};