import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

interface Props {
	onSubmit: (data: FieldValues) => void;
}

const descriptionMin = 3;

const schema = z.object({
	description: z.string().min(descriptionMin, {
		message: `Name must be at least ${descriptionMin} characters`,
	}),
	amount: z
		.number({ invalid_type_error: "Amount is required" })
		.positive({ message: "Amount must be more than zero" }),
	category: z.enum(categories, {
		required_error: "Please select a category",
	}),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	return (
		<>
			<form
				onSubmit={handleSubmit((data: FieldValues) => {
					onSubmit(data);
					reset();
				})}
			>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						{...register("description")}
						id="description"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						{...register("amount", { valueAsNumber: true })}
						id="amount"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select
						{...register("category")}
						id="category"
						className="form-select"
						defaultValue=""
					>
						<option value=""></option>
						<option value="Groceries">Groceries</option>
						<option value="Utilities">Utilities</option>
						<option value="Entertainment">Entertainment</option>
					</select>
				</div>
				<button
					disabled={!isValid}
					type="submit"
					className="btn btn-primary"
				>
					Add Expense
				</button>
			</form>
		</>
	);
};

export default ExpenseForm;
