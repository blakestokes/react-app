import styled from "styled-components";

const StyledButton = styled.button`
	background-color: #2ea44f;
	color: white;
`;

interface Props {
	children: string;
	onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
	return (
		<StyledButton type="button" onClick={onClick}>
			{children}
		</StyledButton>
	);
};

export default Button;
