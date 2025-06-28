import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, 'codes');
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
const extMap = {
    cpp:'.cpp',

    python:'.py',
    java:'.java'
};
const generateFile = async (code, language) => {
    const jobId = uuid();
    const extension = extMap[language] ;
    if(!extension){
        throw new Error(`Unsupported language: ${language}`);
    } // Default to C++ if language is not recognized
    const filename = language === 'java' ? 'Main.java': `${jobId}${extension}`;
    const filepath = path.join(dirCodes,filename);
    await fs.writeFileSync(filepath, code);
    return filepath;

};

export default generateFile;