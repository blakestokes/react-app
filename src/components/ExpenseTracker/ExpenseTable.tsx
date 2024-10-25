import { useState } from "react";
import { FieldValues } from "react-hook-form";
import categories from "../categories";

interface Props {
	expenses: FieldValues[];
	onDelete: (index: number) => void;
}

const ExpenseTable = ({ expenses, onDelete }: Props) => {
	if (expenses.length === 0) return null;
	const [categoryFilter, setCategoryFilter] = useState("All Categories");

	return (
		<>
			<div>
				<select
					id="categories"
					className="form-select"
					value={categoryFilter}
					onChange={(event) => setCategoryFilter(event.target.value)}
				>
					<option value="All Categories">All Categories</option>
					{categories.map((category) => (
						<option value={category}>{category}</option>
					))}
				</select>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Description</th>
							<th scope="col">Amount</th>
							<th scope="col">Category</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{expenses
							.filter(
								(expense) =>
									categoryFilter === "All Categories" ||
									expense.category === categoryFilter
							)
							.map((expense, index) => (
								<tr key={index}>
									<td className="align-middle">
										{expense.description}
									</td>
									<td className="align-middle">
										${parseFloat(expense.amount).toFixed(2)}
									</td>
									<td className="align-middle">
										{expense.category}
									</td>
									<td className="align-middle">
										<button
											className="btn btn-outline-danger"
											onClick={() => onDelete(index)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						<tr>
							<td>Total</td>
							<td>
								$
								{expenses
									.filter(
										(expense) =>
											categoryFilter ===
												"All Categories" ||
											expense.category === categoryFilter
									)
									.reduce(
										(sum, expense) => sum + expense.amount,
										0
									)
									.toFixed(2)}
							</td>
						</tr>
					</tbody>
				</table>
				)
			</div>
		</>
	);
};

export default ExpenseTable;
