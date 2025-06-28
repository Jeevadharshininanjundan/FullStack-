 import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  executeCpp from './executeCpp.js';
import executePy from './executePy.js';
import executeJava from './executeJava.js';
import  generateFile from './generateFile.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/run',async (req,res) => {
    const { language, code , input="" , testCases = []} = req.body;
    if (!code) {    
        return res.status(400).json({ error: 'Code is required' });
    }
    try{
        const execute = {
            cpp : executeCpp,
            python: executePy,
            java: executeJava
        }[language];
        const filePath = await generateFile(code, language);
        const results = [];
        for(let i =0;i<testCases.length;i++){
            const input = testCases[i].input;
            const expectedOutput = testCases[i].output;
            const output = await execute(filePath, input);
            
            if(output.trim() == expectedOutput.trim()){
                results.push({testCase: i+1,passed:true});
            }else{
                results.push({
                    testCase : i + 1,
                    passed : false,
                    expected : expectedOutput.trim(),
                    actual:output.trim()
                });
            }
        }
        const allPassed = results.every((r) => r.passed);
        res.json({
            success:true,allPassed,results });
        
    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({ success: false, error: error.message || 'An error occurred' });
}
});

app.listen(8000, () =>{
    console.log('Compiler server is running on port 8000');
});
