import mongoose from "mongoose";
import { required } from "zod/v4/core/util.cjs";
import { getAssetUrl } from "../utils/helper";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
}, {
    virtuals: {
        photoUrl: {
            get() {
                return `${getAssetUrl('photos')}${this.photo}`
            }
        }
    },
    toJSON: {
        virtuals: true
    }
});

// nama model, schema, collection di MongoDB Compas
export default mongoose.model('User', userSchema, 'users')