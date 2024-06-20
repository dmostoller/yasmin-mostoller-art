import { createContext, useContext, useState } from "react";

//1. create context object
const UserContext = createContext();

//2. create the context provider (quasi-component)
function UserProvider({ children }) {

    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
} 

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
//3. finally, export the context the provider

export { useUser, UserProvider }



////METHOD TWO - CUSTOM HOOK