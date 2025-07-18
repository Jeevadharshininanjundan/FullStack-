import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

const executePy = (filePath, input ="") => {
    return new Promise((resolve, reject) => {
        const child = exec(`python "${filePath}"`,(err,stdout,stderr) => {
            if(err) return reject({error:err.message});
            if(stderr && !stdout) return reject({error:stderr});
            resolve(stdout.trim());
        });
        if(input){
        child.stdin.write(input);
        }
        child.stdin.end();
    });
       
};
export default executePy;