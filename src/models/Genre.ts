import mongoose from "mongoose";

const gendreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
        }
    ]
}, { timestamps: true });

export default mongoose.model('Genre', gendreSchema, 'genres');