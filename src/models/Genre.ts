import mongoose from "mongoose";

const gendreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Genre', gendreSchema, 'genres');