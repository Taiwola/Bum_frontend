const API_BASE_URL = "http://localhost:4000";

interface valueInterface {
    title: string,
    description: string,
    url: string,
    subAccountId: string,
    contactId?: string
}

export const create_media = async (value: valueInterface) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/media`, {
        method: "POST",
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

export const get_all_media = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/media`, {
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

export const get_one_media = async (mediaId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/media/${mediaId}`, {
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

export const update_media = async (value: Partial<valueInterface>) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/media`, {
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

export const delete_media = async (mediaId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/media/${mediaId}`, {
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