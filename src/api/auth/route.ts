import { TFormSchema } from "@/form/registerForm";
import { TFormLoginSchema } from "@/form/sign-in";


const API_BASE_URL = "http://localhost:4000";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export  const loginRoute = async ({email, password}: TFormLoginSchema) => {
    const options = {
        email: email, password: password
    };

    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }

    const token = data.token;
    sessionStorage.setItem("token", token);
    return "login success!";
}

export const registerRoute = async ({email, password, name}: TFormSchema) => {
    const options = {
        email: email, name: name, password: password
    }

    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    })

    console.log(res);

    const  data = await res.json();
    if (!res.ok) {
        // throw new Error("error");
        console.log(data.message);
        throw new Error(data.message);
    }
    return data.message;
}