import mongoose from "mongoose";
import { required } from "zod/v4/core/util.cjs";

const transactionSeatSchema = new mongoose.Schema({
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
    seat: {
        type: String,
        required: true,
    }
});

export default mongoose.model(
    'TransactionSeat',
    transactionSeatSchema,
    'transactionSeats' // collection
);
