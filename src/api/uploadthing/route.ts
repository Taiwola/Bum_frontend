const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadLogo = async (file: File) => {
    const token = sessionStorage.getItem("token");
     // Log the file object to verify its contents
     console.log("File:", file);

     // Create a new FormData object
     const formData = new FormData();
     
     // Append the file to the FormData object
     formData.append("file", file);



    try {
        // Send a POST request to the upload endpoint with the FormData
        const res = await fetch(`${API_BASE_URL}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData, // Pass the FormData as the request body
        });

        // Check if the request was successful
        if (res.ok) {
            // Return the response data (if needed)
            const response = await res.json();
            return  response.data;
        } else {
            // If the request failed, throw an error
            throw new Error("Failed to upload");
        }
    } catch (error) {
        // Handle any errors that occur during the upload process
        console.error("Error uploading: ", error);
        throw error;
    }
};
