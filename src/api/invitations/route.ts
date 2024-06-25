import { RoleEnum } from "@/types/types";

const API_BASE_URL = "http://localhost:4000";

interface valuesInterface {
    role: RoleEnum, agencyId: string, email: string
}

export const createInvitations = async (values: valuesInterface) => {
const token = sessionStorage.getItem("token");



const res = await fetch(`${API_BASE_URL}/api/invitation`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values)
});

if (!res.ok) return null;

const response = await res.json();

return response.message;

}