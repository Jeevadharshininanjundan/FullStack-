import Problems from '../models/Problems.js';

export const getProblem = async (req, res) => {
    try{
        const newProblem = new Problems(req.body);
        await newProblem.save();
        res.status(201).json({ message: 'Problem created successfully'});
    
    }catch (error) {
        res.status(500).json({ message: 'failed to add problem' });
    }
};

export const getAllProblems = async (req, res) => {
    try{
        const problems = await Problems.find();
        res.status(200).json(problems);
    }catch (error) {
        res.status(500).json({ message: 'Failed to fetch problems' });
    }
};

export const getProblemById = async (req, res) => {
    try{
        const problem = await Problems.findById(req.params.id);
        if(!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(problem);

    }catch(error){
        res.status(500).json({message: "Failed to fetch problem by ID"});
    }
};

export const addProblem = async (req,res) => {
    try{
        const newProblem = new Problems(req.body);
        await newProblem.save();
        res.status(201).json({ message: 'Problem created successfully' });
    }catch(error){
        res.status(500).json({ message: 'Failed to add problem' });
    }
}