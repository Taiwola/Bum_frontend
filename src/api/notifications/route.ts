const API_BASE_URL = "http://localhost:4000";

export const get_all_notification = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`${API_BASE_URL}/api/notification`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        console.error("Failed to get notification", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.data;
}