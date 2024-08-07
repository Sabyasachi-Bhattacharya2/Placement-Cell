
import mongoose from "mongoose"



export const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    department: String,
    companiesApplied: {
        type: [String],
        default: []
    } 
});