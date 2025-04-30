import mongoose from "mongoose"
import { string } from "zod"

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }]
}, {
  timestamps: true
})

export const User = mongoose.model("User", userSchema)