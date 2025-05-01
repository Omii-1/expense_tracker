import express from "express"

import { createExpense, getAllExpenses, updateExpense, deleteExpense, getExpense, expenseChart} from "../controller/expense.controller.js"
import userAuth from "../middleware/userAuth.middleware.js"

const router = express.Router()

router.post("/create", userAuth, createExpense)
router.get("/get", userAuth, getAllExpenses)
router.put("/update/:id", userAuth, updateExpense)
router.delete("/delete/:id", userAuth, deleteExpense)
router.get("/get/:id", userAuth, getExpense)
router.get("/chart", userAuth, expenseChart)

export default router