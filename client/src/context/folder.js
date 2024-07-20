import { createContext, useContext, useState } from "react";

//1. create context object
const FoldersContext = createContext();

//2. create the context provider (quasi-component)
function FoldersProvider({ children }) {

    const [folders, setFolders] = useState(null)

    return (
        <FoldersContext.Provider value={{folders, setFolders}}>
            {children}
        </FoldersContext.Provider>
    )
} 

const useFolders = () => {
    const context = useContext(FoldersContext)
    if (!context) {
        throw new Error("useUser must be used within a FoldersProvider")
    }
    return context
}
//3. finally, export the context the provider

export { useFolders, FoldersProvider }