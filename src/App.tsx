import ListGroup from "./components/ListGroup";
import "./App.css";

import Alert from "./components/Alert";
import Button from "./components/Button";
import { BsCalendarFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Like from "./components/Like";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import Form from "./components/Form";
import ProductList from "./components/ProductList";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

// Simulate connecting to a chat server
const connect = () => console.log("connecting");
const disconnect = () => console.log("disconnecting");

function App() {
    const { users, error, isLoading, setUsers, setError } = useUsers();

    const deleteUser = (user: User) => {
        const originalUsers = [...users];
        setUsers(users.filter((u) => u.id !== user.id));
        userService.delete(user.id).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    };

    const [category, setCategory] = useState("");

    useEffect(() => {
        connect();

        return () => disconnect();
    });

    // basically afterRender
    useEffect(() => {
        document.title = "React App";
    });

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

    const addUser = () => {
        const originalUsers = [...users];
        const newUser = { id: 0, name: "Blake" };
        setUsers([newUser, ...users]);
        userService
            .create(newUser)
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch((err) => {
                setError(err.message);
                setUsers(originalUsers);
            });
    };

    const updateUser = (user: User) => {
        const originalUsers = [...users];
        const updatedUser = { ...user, name: user.name + "!" };
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

        userService.update(updatedUser).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    };

    return (
        <div>
            {/* Connecting to the backend */}
            <div>
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <div className="spinner-border"></div>}
                <button className="btn btn-primary mb-3" onClick={addUser}>
                    Add
                </button>
                <ul className="list-group">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            {user.name}
                            <div>
                                <button
                                    className="btn btn-outline-secondary mx-1"
                                    onClick={() => updateUser(user)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteUser(user)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <select
                    className="form-select"
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value=""></option>
                    <option value="Clothing">Clothing</option>
                    <option value="Household">Household</option>
                </select>
                <ProductList category={category} />
            </div>

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
