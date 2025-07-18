import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User',required: true},
    problemId: {type:mongoose.Schema.Types.ObjectId, ref:'Problems',required:true},
    problemTitle : {type:String},
    code: {type : String,required :true},
    language: {type:String, required: true},
    verdict: {type:String, required: true},
    runtime: { type: String, default: 'N/A' },
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', default: null },
  timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
