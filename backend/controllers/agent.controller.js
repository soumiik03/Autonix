import Agent from '../models/agent.model.js';

export const createAgent = async (req, res) => {
    try {
        const { name, knowledgeBase, instructions, tools } = req.body;
        if(!name || !instructions || !tools || !knowledgeBase) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const userId = req.user?._id; 

        const agent=await Agent.create({
            userId, name, knowledgeBase, instructions, tools
        });
        return res.status(201).json({ message: 'Agent created successfully', agent });
    }   
    catch (error) {
        res.status(500).json({ message: `Create agent server error ${error.message}` });
    }   
}      

export const getAllAgents = async (req, res) => {
    try {
        const userId = req.user?._id;
        const agents = await Agent.find({ userId });
        return res.status(200).json({ agents });
    }   
    catch (error) {
        
        res.status(500).json({ message: `Get agents server error ${error.message}` });
    }   
}

export const getAgentById = async (req, res) => {
    try {
        const userId = req.user?._id;
        const agentId = req.params.id;
        const agent = await Agent.findOne({ _id: agentId, userId });

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        return res.status(200).json( {agent} );
    }
    catch (error) {
        res.status(500).json({ message: `Get agent by id server error ${error.message}` });
    }  
}

export const deleteAgent = async (req, res) => {
    try {
        const userId = req.user?._id;
        const agentId = req.params.id;
        const agent = await Agent.findOneAndDelete({ _id: agentId, userId });
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        return res.status(200).json({ message: 'Agent deleted successfully', agent });
    }
    catch (error) {
        res.status(500).json({ message: `Delete agent server error ${error.message}` });
    }   
}
