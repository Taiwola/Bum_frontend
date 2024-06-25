const API_BASE_URL = "http://localhost:4000";


interface ValueInterface {
    email: string,
    access: boolean,
    subAccountId: string,
    userId: string
}

export const create_permission = async (value: ValueInterface) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions`, {
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

export const updatePermission = async (perId:string, value: Partial<ValueInterface>) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions/${perId}`, {
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


export const get_all_permissions = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}


export const get_one_permissions = async (perId: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions/${perId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}



export const get_one_user_permissions = async (userId: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}


export const delete_permissions = async (perId:string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/permissions/${perId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.message;
}