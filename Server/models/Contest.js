import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problems' }]
});


const Contest = mongoose.model('Contest', contestSchema);
export default Contest;
