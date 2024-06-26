import { agencyTypeSchema } from "@/form/agencyDetails";

const API_BASE_URL = "http://localhost:4000";


export const create_agency = async (formData: agencyTypeSchema) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/agency`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        console.error("Failed to create agency", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.message; 
}


export const get_agency = async (agencyId: string | null) => {
    if (!agencyId) {
        console.error("No agencyId provided");
        return null;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("No token found in sessionStorage");
        return null;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/agency/${agencyId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!res.ok) {
            console.error("Failed to fetch agency data", res.statusText);
            return null;
        }

        const response = await res.json();

        return response.data ?? null; // Return response.data if it's defined, otherwise null
    } catch (error) {
        console.error("Error fetching agency data", error);
        return null;
    }
}


