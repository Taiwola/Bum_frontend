import { SubAccountTypeSchema } from "@/form/subaccountDetails";

const API_BASE_URL = "http://localhost:4000";

export const create_subaccount = async (formData: SubAccountTypeSchema) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/subaccount`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
    });

    if (!res.ok) {
        console.error("Failed to create agency", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.message; 
}

export const get_subaccount = async (subaccountId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/subaccount/${subaccountId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        console.error("Failed to create agency", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.data; 
}

export const get_all_subaccount = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/subaccount`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        console.error("Failed to get all sub accounts", res.statusText);
        return null;
    }

    const response = await res.json();

    return response.data; 
}

export const delete_subaccount = async (subAccountId: string) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/subaccount/${subAccountId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
});

if (!res.ok) {
    console.error("Failed to delete sub account", res.statusText);
    return null;
}
const response = await res.json();

return response.message;

}