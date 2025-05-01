import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enums: ["Food",
      "Transportation",
      "Utilities",
      "Rent",
      "Entertainment",
      "Health",
      "Education",
      "Shopping",
      "Travel",
      "Insurance",
      "Savings",
      "Miscellaneous"]
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
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema)