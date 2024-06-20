import { createContext, useContext, useState } from "react";

//1. create context object
const DeviceContext = createContext();

//2. create the context provider (quasi-component)
function DeviceProvider({ children }) {

    const [deviceSize, setDeviceSize] = useState(window.innerWidth)

    return (
        <DeviceContext.Provider value={{deviceSize, setDeviceSize}}>
            {children}
        </DeviceContext.Provider>
    )
} 

const useDevice = () => {
    const context = useContext(DeviceContext)
    if (!context) {
        throw new Error("useDevice must be used within a DeviceProvider")
    }
    return context
}
//3. finally, export the context the provider

export { useDevice, DeviceProvider }



////METHOD TWO - CUSTOM HOOK