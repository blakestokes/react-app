import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

const ExpenseTracker = () => {
	const [expenses, setExpenses] = useState<FieldValues[]>([]);

	const onSubmit = (data: FieldValues) => {
		setExpenses([...expenses, data]);
	};

	const onDelete = (index: number) => {
		setExpenses(expenses.filter((_, i) => i !== index));
	};

	return (
		<>
			<div className="mb-5">
				<h1 className="mb-3">Project: Expense Tracker</h1>
				<ExpenseForm onSubmit={onSubmit} />
			</div>
			<div className="mb-3">
				<h3>Expenses</h3>
				<ExpenseTable expenses={expenses} onDelete={onDelete} />
			</div>
		</>
	);
};

export default ExpenseTracker;
