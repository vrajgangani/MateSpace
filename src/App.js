import React, { useState, useEffect } from "react";
import "./App.css";
import Chat from "./Component/Chat";
import Sidebar from "./Component/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserName } from "Component/UserName";
import { LoginContext } from "Utility/LoginContext";

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userName, setUserName] = useState("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once after mount

  return (
    <>
      <div
        id="ndrsl-wol-642bf4af00fc6f440d203953"
        className="ndrsl-widget"
      ></div>

      <BrowserRouter>
        <div className="app">
          <LoginContext.Provider
            value={{ setIsUserLogin, setUserName, userName }}
          >
            {isMobile ? (
              //MOBILE SCREEN VIEW
              isUserLogin ? (
                <div className="chat-outer ">
                  {isChatOpen ? (
                    <Routes>
                      <Route
                        path="/group/:groupID"
                        element={
                          <Chat
                            userName={userName}
                            setIsChatOpen={setIsChatOpen}
                            isChatOpen={isChatOpen}
                          />
                        }
                      ></Route>
                    </Routes>
                  ) : (
                    <Sidebar
                      userName={userName}
                      setIsChatOpen={setIsChatOpen}
                    />
                  )}
                </div>
              ) : (
                <UserName />
              )
            ) : //NORMAL  DESKTOP VIEW
            isUserLogin ? (
              <div className="chat-outer ">
                <Sidebar userName={userName} />

                <Routes>
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

{
  /* <Route
                    path="/"
                    element={<Chat userName={userName} />}
                  ></Route> */
}

{
  /* {isUserLogin ? (
              <div className="chat-outer ">
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
            )} */
}
