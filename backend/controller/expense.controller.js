import zod from "zod"

import { Expense } from "../model/expense.model.js"
import mongoose from "mongoose"

const expenseBody = zod.object({
  amount: zod.number(),
  category: zod.string(),
  description: zod.string(),
  date: zod.date()
}).strict()

// POST /expenses: Add a new expense.
export const createExpense = async (req, res) => {
  try {
    const validation = expenseBody.safeParse(req.body)
    if (!validation) {
      return res.status(401).json({
        error: validation.error.format()
      })
    }

    const { amount, category, description, date } = req.body

    const id = req.user._id

    const expense = await Expense.create({ amount, category, description, date, userId: id })

    return res.status(201).json({
      message: "New expense added",
      expenseId: expense._id,
      expense
    })
  } catch (error) {
    console.log("Error in createExpens controller: ", error);
    return res.status(500).json({ error: "Internal server error" })

  }
}

// GET /expenses: Retrieve all expenses.
export const getAllExpenses = async (req, res) => {
  try {
    const id = req.user._id
    const expenses = await Expense.find({ userId: id }).sort({ createdAt: -1 })

    return res.status(201).json({
      message: "Expenses fetched successfully",
      expenses
    })
  } catch (error) {
    console.log("Error in getAllExpenses controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// PUT /expenses/:id: Update an existing expense.
export const updateExpense = async (req, res) => {
  try {
    const validation = expenseBody.safeParse(req.body)
    if (!validation) {
      return req.status(401).json({
        error: validation.error.format()
      })
    }

    const expenseId = req.params.id
    const expense = await Expense.findById(expenseId)
    if (!expense) {
      return res.status(401).json({
        error: "Invalid expense id"
      })
    }

    const { amount, category, description, date } = req.body

    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, { amount, category, description, date }, { new: true })
    if (!updateExpense) {
      return res.status(401).json({
        error: "Error while updating expense"
      })
    }

    return res.status(201).json({
      message: "Expense updated successfully",
      expense: updatedExpense
    })

  } catch (error) {
    console.log("Error in updateExpense controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// DELETE /expenses/:id: Delete an expense.
export const deleteExpense = async (req, res) => {
  try {
    const userId = req.params.id
    await Expense.findByIdAndDelete(userId)

    return res.status(201).json({
      message: "Movie deleted successfully"
    })
  } catch (error) {
    console.log("Error in deleteExpense controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// GET /expenses/:id: Retrieve specififc expense
export const getExpense = async(req, res) => {
  try {
    const id = req.params.id

    const expense = await Expense.findById(id)

    return res.status(201).json({
      message: "Expense retrieve successfully",
      expense
    })
  } catch (error) {
    console.log("Error in getExpense controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

export const expenseChart = async(req, res) => {
  try {
    const id = req.user._id

    const categoryData = await Expense.aggregate([
      { $match: {userId: new mongoose.Types.ObjectId(id)}},
      { $group: {_id: "$category", total: { $sum: "$amount"}}}
    ])

    const monthlyData = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id)}},
      {
        $group: {
          _id: {$month: "$date"},
          total: {$sum: "$amount"}
        }
      },
      { $sort: {"_id": 1}}
    ])

    return res.status(201).json({
      message: "Chart data fetched successfully",
      categoryData,
      monthlyData
    })
  } catch (error) {
    console.log("Error in expenseChart controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}
