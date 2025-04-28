import { createContext,ReactNode,useContext,useState } from "react";

interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface IProps{
    children:ReactNode
}
export const AuthProvider = ({children}:IProps)=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user-chat") as string) || null);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    if(context === null){
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}