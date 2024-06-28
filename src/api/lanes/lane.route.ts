const API_BASE_URL = "http://localhost:4000";


interface ValueInterface {
    name: string,
    pipelineId: string
    order?: number
}

export const create_lane = async (value: ValueInterface) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane`, {
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

export const getAllLanes = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const response = await res.json();

    if (!res.ok) return null;

    return response.data || [];
}


export const updateLane = async (laneId: string, value: Partial<ValueInterface>) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane/${laneId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value)
    });

    if (!res.ok) return null;

    const response = await res.json();

    return response.data;
}


export const getAllLaneWherePipelineId = async (pipelineId:string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane/${pipelineId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const response = await res.json();

    if (!res.ok) return null;

    return response.data;
}


export const getOneLane = async (laneId:string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane/${laneId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const response = await res.json();

    if (!res.ok) return null;

    return response.data;
}

export const deleteLane = async (laneId: string) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/lane/${laneId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const response = await res.json();

    if (!res.ok) return null;

    return response.message;
}
