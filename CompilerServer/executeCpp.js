import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

const executeCpp = (filePath,input= " ") => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {

        const compileCmd = `g++ "${filePath}" -o "${outPath}"`;

    exec(compileCmd, (compileErr, _, compileStderr) => {
        if (compileErr || compileStderr) {
            return reject({ error: compileErr?.message || compileStderr });
        }

        const child = exec(`"${outPath}"`, (runErr, stdout, runStderr) => {
            if (runErr) return reject({ error: runErr.message });
            if (runStderr) return reject({ error: runStderr });

            resolve(stdout.trim());
        });

        child.stdin.write(input);
        child.stdin.end();
        
        });
    });

};

export default executeCpp;