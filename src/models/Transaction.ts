import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    bookingFee: {
        type: Number,
        required: true,
        default: 0
    },
    tax: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        required: true,
    },
    seats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TransactionSeat',
        },
    ],

    // relasi
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
    },
}, {
    // untuk createAt & updatedAt 
    timestamps: true
});

export default mongoose.model('Transaction', transactionSchema, 'transactions');