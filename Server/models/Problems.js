import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: {  type: String, required: true },
  description: { type: String, required: true },        
  input : String,
    output : String,
    testCases : [
        {
            input: String,
            output: String
        }
    ],
});

export default mongoose.model('Problems', problemSchema);