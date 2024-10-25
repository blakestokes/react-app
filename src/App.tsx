import ListGroup from "./components/ListGroup";
import "./App.css";

import Alert from "./components/Alert";
import Button from "./components/Button";
import { BsCalendarFill } from "react-icons/bs";
import { useState } from "react";
import Like from "./components/Like";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import Form from "./components/Form";

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

	// Updating state of value in nested object of an object
	const [game, setGame] = useState({
		id: 1,
		player: {
			name: "John",
		},
	});
	const handleGameClick = () => {
		// game.player.name = 'Bob';

		setGame({ ...game, player: { ...game.player, name: "Bob" } });
	};

	// Updating state of value in nested array of an object
	const [pizza, setPizza] = useState({
		name: "Spicy Pepperoni",
		toppings: ["Mushroom"],
	});
	const handlePizzaClick = () => {
		// pizza.toppings.push('Cheese');

		setPizza({ ...pizza, toppings: [...pizza.toppings, "Cheese"] });
	};

	// Updating state of value in nested array of objects within an object
	const [cart, setCart] = useState({
		discount: 0.1,
		items: [
			{ id: 1, title: "Product 1", quantity: 1 },
			{ id: 2, title: "Product 2", quantity: 1 },
		],
	});
	const handleCartClick = () => {
		// Change Product 1 quantity to 2

		setCart({
			...cart,
			items: cart.items.map((item) =>
				item.id === 1 ? { ...item, quantity: 2 } : item
			),
		});
	};

	const [alertVisible, setAlertVisibility] = useState(false);
	const [cartItems, setCartItems] = useState(["Product 1", "Product  2"]);

	return (
		<div>
			{/* State between components */}
			<Navbar cartItemsCount={cartItems.length} />
			<Cart cartItems={cartItems} onClear={() => setCartItems([])} />

			<br />
			<br />

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

			{/* ExpandableText Component Exercise */}
			<ExpandableText maxChars={20}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
				maxime eveniet iure commodi unde velit id vero, qui delectus
				temporibus distinctio reprehenderit itaque inventore dicta quia
				repellendus laudantium animi! Libero!
			</ExpandableText>

			<Form></Form>

			<br />
			<ExpenseTracker />
		</div>
	);
}

export default App;
