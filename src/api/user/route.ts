import { userDataType } from "@/form/userDetails";

const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const get_team_members = async (agencyId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/user/team/${agencyId}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    );

    if (!res.ok) {
        console.error("Failed to get team", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.data;
}

export const get_user = async (userId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    );

    if (!res.ok) {
        console.error("Failed to create agency", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.data;
}

export const delete_user = async (userId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    );

    if (!res.ok) {
        console.error("Failed to create agency", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.message;
}

export const update_user = async (userId: string, value: userDataType) => {
    console.log("herlo")
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });


    if (!res.ok) {
        console.log(`something went wrong `, res.statusText);
        return null;
    }

    const response = await res.json();

    return response.message;
}