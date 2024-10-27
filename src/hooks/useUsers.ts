import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setError("");
        setLoading(true);
        const { request, cancel } = userService.getAll<User>();
        request
            .then((res) => {
                setLoading(false);
                setUsers(res.data);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setLoading(false);
                setError(err.message);
            });
        // This won't work in StrictMode but is the better way of cancelling loading
        // instead of cancelling after then or catch
        // .finally(() => setLoading(false));

        return () => cancel();
    }, []);

    return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
