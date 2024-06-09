
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

    const res = await fetch(`${API_BASE_URL}/api/user/team/${userId}`,{
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

    const res = await fetch(`${API_BASE_URL}/api/user/team/${userId}`,{
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