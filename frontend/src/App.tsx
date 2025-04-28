import { Navigate, Route, Routes } from "react-router"
import HomePage from "./pages/home/Home"
import LoginPage from "./pages/login/LoginPage"
import Register from "./components/Register"
import { useAuthContext } from "./context/authContext"

function App() {
    const {user} = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center bg-hero-pattern bg-no-repeat bg-cover bg-center">
        <Routes>
            <Route path="/" element={user ?<HomePage/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={user ? <Navigate to="/"/> :<LoginPage/>}/>
            <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
