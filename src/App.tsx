// import ListGroup from "./components/ListGroup";

import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
	// let items = [
	// 	"Moscow",
	// 	"Berlin",
	// 	"Paris",
	// 	"London",
	// 	"Tokyo",
	// 	"Wellington",
	// 	"Rome",
	// 	"Geneva",
	// 	"New York City",
	// ];

	return (
		<div>
			<Alert>
				Hello <span>World</span>
			</Alert>
			<Button
				color="dark"
				onClick={() => console.log("Muse button clicked")}
			>
				Muse
			</Button>
			{/* <ListGroup
				items={items}
				heading="Pressure Cities"
				onSelectItem={(item: string) => {
					alert(item + " clicked");
				}}
			/> */}
		</div>
	);
}

export default App;
