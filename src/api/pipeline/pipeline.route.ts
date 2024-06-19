import { Pipeline } from "@/types/types";

const API_BASE_URL = "http://localhost:4000";

interface valueInterface {
    name: string,
    subAccountId: string
}

export const create_pipeline = async (value: valueInterface): Promise<Pipeline | string> => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/pipeline`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });

    const response = await res.json();

    if (!res.ok) return response.message;

    return response.data;
}

export const get_all_pipeline = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/pipeline`, {
        method: "GET",
        headers: {
            "Content-Type": "appication/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();

    if (!res.ok) return response.message;

    return response.data;
}

export const get_all_pipeline_where_subaccountId = async (subAccountId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/pipeline/subaccount/${subAccountId}`, {
        method: "GET",
        headers: {
            "Content-Type": "appication/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();

    if (!res.ok) return response.message;

    return response.data;
}

export const get_one_pipeline = async (pipelineId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/pipeline/${pipelineId}`, {
        method: "GET",
        headers: {
            "Content-Type": "appication/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();

    if (!res.ok) return response.message;

    return response.data;
}

export const update_pipe = async (value: Partial<valueInterface>) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/pipeline`, {
        method: "PATCH",
        headers: {
            "Content-Type": "appication/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });
    const response = await res.json();

    if (!res.ok) return response.message;

    return response.message;
}

export const delete_pipe = async (pipelineId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/pipeline/${pipelineId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "appication/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();

    if (!res.ok) return response.message;

    return response.message;
}