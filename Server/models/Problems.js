import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: {  type: String, required: true },
  description: { type: String, required: true },        
  input : String,
  output : String,
  tags: [String],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy'},
  acceptance: { type: Number, default: 0 },
    testCases : [
        {
            input: String,
            output: String
        }
    ],
});

export default mongoose.model('Problems', problemSchema);