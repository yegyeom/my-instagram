import { createContext, useState } from "react";

const UserContext = createContext({
    state: { user: null },
    actions: {
        setUser: () => { },
    }
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const value = {
        state: { user },
        actions: { setUser }
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };

export default UserContext;