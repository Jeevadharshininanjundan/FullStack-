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
        const className = 'Main';

        const compileCommand = `javac "${filePath}"`;
        const inputSanitized = input.replace(/\r?\n/g, '\r\n'); // Windows line endings
        const runCommand = `cd "${dir}" && echo ${JSON.stringify(inputSanitized)} | java ${className}`;
        const fullCommand = `${compileCommand} && ${runCommand}`;

        exec(fullCommand, (err, stdout, stderr) => {
            if (err) return reject({ error: err.message });
            if (stderr) return reject({ error: stderr });
            resolve(stdout.trim());
        });
});
       
};
export default executeJava;