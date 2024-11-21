import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";

export const backendURL = process.env.REACT_APP_BACKEND_URL;




function App() {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])

  return (
    <div className="App">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div>
            <Sidebar />
            <div>
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
