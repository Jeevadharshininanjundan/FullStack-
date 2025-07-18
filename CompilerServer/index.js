 import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  executeCpp from './executeCpp.js';
import executePy from './executePy.js';
import executeJava from './executeJava.js';
import  generateFile from './generateFile.js';


const app = express();
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5000'], // allow frontend
  credentials: true               // allow cookies or auth headers
}));
app.use(bodyParser.json());

app.post('/run',async (req,res) => {
    const { language, code , input="" , testCases = [], mode = 'run'} = req.body;
     console.log('🚀 Incoming Request:', { language, mode, hasCode: !!code });

    if (!code) {    
        return res.status(400).json({ error: 'Code is required' });
    }
    
        const executeMap = {
            cpp : executeCpp,
            python: executePy,
            java: executeJava
        };

        const execute = executeMap[language];

        if (!execute) {
  return res.status(400).json({ error: 'Unsupported language' });
}
       try{ 
        const filePath = await generateFile(code, language);
        
        if (mode === 'submit' && Array.isArray(testCases) && testCases.length > 0)
        {
        const results = [];
        for(let i =0;i<testCases.length;i++){
            const testInput = testCases[i].input || '';
            const expectedOutput = testCases[i].output;
            let output ;
            try{
                output = await execute(filePath, testInput);
            }
            catch(err){
                return res.status(500).json({ error: 'Execution failed', details: err.message });
            }
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
        return res.json({
            success:true,mode:'submit',allPassed,results });
        
    } 
    else {
    let output 
    try{
        output = await execute(filePath, input || '');
    }catch (err) {
        return res.status(500).json({ error: 'Execution failed', details: err.message });
      }
    return res.json({
        success: true,
        mode:'run',
        output: output.trim()
    });

    }
}
    catch (error) {
        console.error("Full Error:", error);
        return res.status(500).json({ success: false, error: error.message || 'An error occurred' });
}
});

app.listen(8000, () =>{
    console.log('Compiler server is running on port 8000');
});
