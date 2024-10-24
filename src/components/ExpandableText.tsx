import { useState } from "react";

interface Props {
	children: string;
	maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: Props) => {
	const [expanded, setExpanded] = useState(false);

	let text =
		!expanded && children.length > maxChars
			? children.substring(0, maxChars) + "..."
			: children;

	return (
		<>
			<p>{text}</p>
			<button onClick={() => setExpanded(!expanded)}>
				{expanded ? "Less" : "More"}
			</button>
		</>
	);
};

export default ExpandableText;
