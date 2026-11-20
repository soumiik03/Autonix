import api from "../api";


export const createAgent = async ({name, knowledgeBase, instructions, tools }) => {
    try{
        const {data}=await api.post("/api/agent/create",{name, knowledgeBase, instructions, tools })
        return data
    } catch (error) {
        console.error("Create agent failed:", error);
        throw error;
    }
}

export const getAllAgents = async () => {
    try {
        const {data}=await api.get("/api/agent/all")
        return data
        
    } catch (error) {
        console.log("Get all agents failed:", error);
    }    
}

export const getAgentById = async (id) => {
    try {
        const {data}=await api.get(`/api/agent/${id}`)
        return data
        
    } catch (error) {
        console.log("Get agent by ID failed:", error);
    }   
}    

export const deleteAgent = async (id) => {
    try {
        const {data}=await api.delete(`/api/agent/${id}`)
        return data
    } catch (error) {
        console.log("Delete agent failed:", error);
    }   
}    