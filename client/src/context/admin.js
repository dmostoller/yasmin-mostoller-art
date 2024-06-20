import { createContext, useContext, useState } from "react";

//1. create context object
const AdminContext = createContext();

//2. create the context provider (quasi-component)
function AdminProvider({ children }) {

    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <AdminContext.Provider value={{isAdmin, setIsAdmin}}>
            {children}
        </AdminContext.Provider>
    )
} 

const useAdmin = () => {
    const context = useContext(AdminContext)
    if (!context) {
        throw new Error("useAdmin must be used within a AdminProvider")
    }
    return context
}
//3. finally, export the context the provider

export { useAdmin, AdminProvider }



////METHOD TWO - CUSTOM HOOK