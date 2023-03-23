import React, { useState } from "react";
import "./App.css";
import Chat from "./Component/Chat";
import Sidebar from "./Component/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserName } from "Component/UserName";
import { LoginContext } from "Utility/LoginContext";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <LoginContext.Provider value={{ setUserLogin, setUserName }}>
            {userLogin ? (
              <div className="chat-outer">
                <Sidebar userName={userName} />
                <Routes>
                  <Route
                    path="/"
                    element={<Chat userName={userName} />}
                  ></Route>
                  <Route
                    path="/group/:groupID"
                    element={<Chat userName={userName} />}
                  ></Route>
                </Routes>
              </div>
            ) : (
              <UserName />
            )}
          </LoginContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
