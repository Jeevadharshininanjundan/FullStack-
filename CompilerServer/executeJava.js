import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

const executeJava = (filePath, input ="") => {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        const fileName = path.basename(filePath);
        const className = fileName.replace('.java','');

        const compileCommand = `javac "${filePath}"`;
       
        const runCommand = `cd "${dir}" &&  java ${className}`;
        const fullCommand = `${compileCommand} && ${runCommand}`;

        const child = exec(fullCommand, (err, stdout, stderr) => {
            if (err) return reject({ error: err.message });
            if (stderr) return reject({ error: stderr });
            resolve(stdout.trim());
        });
        if(input){
            child.stdin.write(input);
        }
        child.stdin.end();
});
       
};
export default executeJava;