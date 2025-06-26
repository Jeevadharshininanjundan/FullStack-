const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && ${outPath}`,(error,stdout,stderr) =>{
            if(error) return reject({error,stderr});
            if(stderr) return reject(stderr);
            resolve(stdout);
        });
    });

};

module.exports = {executeCpp};