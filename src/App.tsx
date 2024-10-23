import ListGroup from "./components/ListGroup";
import "./App.css";

import Alert from "./components/Alert";
import Button from "./components/Button";
import { BsCalendarFill } from "react-icons/bs";
import { useState } from "react";
import Like from "./components/Like";

function App() {
	let items = [
		"Moscow",
		"Berlin",
		"Paris",
		"London",
		"Tokyo",
		"Wellington",
		"Rome",
		"Geneva",
		"New York City",
	];

	const [alertVisible, setAlertVisibility] = useState(false);

	return (
		<div>
			<BsCalendarFill color="red" size="40" />
			{alertVisible && (
				<Alert id="testAlert" onClose={() => setAlertVisibility(false)}>
					<strong>Holy guacamole!</strong> You should check in on some
					of those fields below.
				</Alert>
			)}
			<Button onClick={() => setAlertVisibility(true)}>Muse</Button>
			<ListGroup
				items={items}
				heading="Pressure Cities"
				onSelectItem={(item: string) => {
					console.log(item + " clicked");
				}}
			/>
			<Like onClick={(liked) => console.log("like clicked: " + liked)} />
		</div>
	);
}

export default App;
