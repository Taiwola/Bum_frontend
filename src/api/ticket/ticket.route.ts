import { Tag } from "@/types/types";

const API_BASE_URL = "http://localhost:4000";

interface ValueInterface {
    name: string,
    description?: string,
    //isClosed?: boolean,
    subAccountId: string;
    laneId: string;
    customerId?: string;
    assignedUserId: string;
    tags: Tag[]
}

export const create_ticket = async (value: ValueInterface) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/ticket`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.message;
}

export const update_ticket = async (ticketId: string,value: Partial<ValueInterface>) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/ticket/${ticketId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.message;
}


export const getAllTicket = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/ticket`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}

export const getOneTicket = async (ticketId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/ticket/${ticketId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}

export const getAllTicketWhereLaneId = async (laneId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/ticket/lane/${laneId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}


export const deleteTicket = async (ticketId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane/${ticketId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const response = await res.json();

    if (!res.ok) return null;

    return response.message;
}