import Problems from '../models/Problems.js';
import axios from 'axios';  
import Submission from '../models/Submission.js';



export const getAllProblems = async (req, res) => {
    try{
        const difficulty = req.query.difficulty;
        let problems; 
        if(difficulty) {
            problems = await Problems.find({ difficulty });
        } else {
            problems = await Problems.find();
        }
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
        console.error(error);
        res.status(500).json({ message: 'Failed to add problem' });
    }
}

export const submitSolution = async (req, res) => {
    const {id} = req.params;
    const { code, language} = req.body;
    const userId = req.user?.id;

    try{
        const problem = await Problems.findById(id);
        if(!problem) return res.status(404).json({ message: 'Problem not found' });

        let verdict = 'Accepted';
        let runtime = 'N/A';

        for(const test of problem.testCases){
            const result = await axios.post('http://localhost:8000/run',{
                code,
                input:test.input,
                language,
            });
            const expected = test.output?.trim();
            const actual = result.data.output?.trim();
            runtime =  result.data.runtime || 'N/A';
            if(actual !== expected) {
                verdict = 'Wrong Answer';
                break;
            }
        }
        await Submission.create({
            userId,
            problemId : id,
            problemTitle : problem.title,
            code,
            language,
            verdict,
            runtime

        });
         return res.status(200).json({ verdict });
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ message: 'Error during submission', error:error?.reesponse?.data || error.message  });
    }
        }  ; 
    
export const updateProblem = async(req,res) => {
    try{
        const updated = await Problems.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updated) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem updated successfully', problem: updated });
    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ message: 'Failed to update problem' });
    }
};

export const deleteProblem = async (req, res)=> {
    try{
        await Problems.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Problem deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting problem:', error);
        res.status(500).json({ message: 'Failed to delete problem' });
    }
};

