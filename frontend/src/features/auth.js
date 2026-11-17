import api from "../api";


export const login = async (token) => {
    const {data}=await api.post("/api/auth/login",{token})
    return data
}

export const logout = async () => {
    try {
        const {data}=await api.get("/api/auth/logout")
        return data
        console.log("Logout successful:", data);
    } catch (error) {
        console.log("Logout failed:", error);
    }    
}

export const me = async () => {
    try {
        const {data}=await api.get("/api/auth/me")
        return data
        console.log("Me successful:", data);
    } catch (error) {
        console.log("Me failed:", error);
    }   
}    