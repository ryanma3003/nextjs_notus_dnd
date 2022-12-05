import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String},
    point: {type: Number, min: 10, max: 1000},
    status: {type: String},
});

// export default mongoose.models.Task;
// export default mongoose.model('Task', taskSchema)
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;