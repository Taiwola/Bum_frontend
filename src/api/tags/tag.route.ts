const API_BASE_URL = "http://localhost:4000";

interface ValueInterface {
    color: string,
    subAccountId: string,
    name: string
}

export const create_tag = async (value: ValueInterface) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/tag`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(value)
    });

    if (!res.ok) {
        return null;
    };

    const response = await res.json();

    return response.message;
};


export const update_tag = async (tagId: string, value: Partial<ValueInterface>) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/tag/${tagId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(value)
    })

    if (!res.ok) {
        return null;
    };

    const response = await res.json();

    return response.message;
}


export const get_all_tags = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/tag`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}


export const get_one_tags = async (tagId: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/tag/${tagId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}

export const get_one_tag_where_subacctId = async (subAcctId:string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/tag/subaccount/${subAcctId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}

export const delete_tag = async (tagId: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/tag/${tagId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.message;
}

