import { createContext, useState } from "react";

const UserContext = createContext({
    state: { id: null, userId: null },
    actions: {
        setId: () => { },
        setUserid: () => { },
    }
});

const UserProvider = ({ children }) => {
    const [id, setId] = useState("");
    const [userId, setUserid] = useState("");

    const value = {
        state: { id, userId },
        actions: { setId, setUserid }
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };

export default UserContext;