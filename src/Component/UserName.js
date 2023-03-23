import React, { useContext } from "react";
import { LoginContext } from "Utility/LoginContext";
import "./Home.css";

export const UserName = () => {
  const { setUserLogin, setUserName } = useContext(LoginContext);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const submitUserName = () => {
    setUserLogin(true);
  };
  return (
    <>
      <div className="context ">
        <div className="area">
          <div className="usename-box ">
            <h5 className="card-title text-center">Welcome To MateSpace</h5>

            <form onSubmit={submitUserName} className="d-flex">
              <input
                type={"text"}
                placeholder="Enter User Name..."
                className="form-control"
                onChange={onChangeUserName}
              />

              <button type="submit" className="btn btn-primary mx-2">
                Submit
              </button>
            </form>
          </div>
          <div style={{ position: "absolute", bottom: "5px", right: "10px",fontSize:'0.8rem' }}>
            Made With <strong>🤍 Vraj Gangani</strong>
          </div>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};
