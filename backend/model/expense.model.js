import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true})

const Expense = mongoose.model("Expense", expenseSchema)