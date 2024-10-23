import { useState } from "react";
import { LuHeart } from "react-icons/lu";

interface Props {
	onClick: (liked: boolean) => void;
}

function Like({ onClick }: Props) {
	const [outlineColor, setOutlineColor] = useState("black");
	const [fillColor, setFillColor] = useState("none");
	const [liked, setLiked] = useState(false);

	const toggleLike = () => {
		setOutlineColor(outlineColor === "red" ? "black" : "red");
		setFillColor(fillColor === "red" ? "none" : "red");
		setLiked(!liked);
	};

	return (
		<LuHeart
			color={outlineColor}
			fill={fillColor}
			size="40"
			onClick={() => {
				toggleLike();
				onClick(liked);
			}}
		/>
	);
}

export default Like;
