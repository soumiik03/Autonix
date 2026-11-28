import api from "@/api";

export const connectGoogle=async()=>{
    const {data}=await api.get("/api/integrations/google/connect")
    return data;
}

export const disconnectGoogle=async()=>{
    const {data}=await api.get("/api/integrations/google/disconnect")
    return data
}

export const getIntegrations=async()=>{
    const {data}=await api.get("/api/integrations/all")
    return data.integrations
}
