const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');
const { executeCpp } = require('./executeCpp'); 
const { generateFile } = require('./generateFile'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/run',async (req,res) => {
    const { language="cpp", code , input="" } = req.body;
    if (!code) {    
        return res.status(400).json({ error: 'Code is required' });
    }
    try{
        const filePath = await generateFile(code);
        const output = await executeCpp(filePath);
        console.log('Output:', output);
        res.json({ success: true, output });    
    } catch (error) {
        res.status(500).json({ success: false, error: error.message || 'An error occurred' });
}
});

app.listen(8000, () =>{
    console.log('Compiler server is running on port 8000');
});
