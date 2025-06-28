import Problems from '../models/Problems.js';
import axios from 'axios';  

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

export const submitSolution = async (req, res) => {
    const {id} = req.params;
    const { code, language} = req.body;

    try{
        const problem = await Problems.findById(id);
        if(!problem) return res.status(404).json({ message: 'Problem not found' });

        const testCases = problem.testCases;
        let verdict = 'Accepted';

        for(const test of testCases){
            const result = await axios.post('http://localhost:8000/run',{
                code,
                input:test.input,
                language,
            });
            const expected = test.output.trim();
            const actual = result.data.output.trim();
            if(actual !== expected) {
                verdict = 'Wrong Answer';
                break;
            }
        }
         res.status(200).json({ verdict });
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ message: 'Error during submission', error: error.message  });
    }
        }  ; 
    