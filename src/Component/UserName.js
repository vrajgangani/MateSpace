import React, { useContext } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import { LoginContext } from "Utility/LoginContext";
import "./Home.css";
import "../App.css"

export const UserName = () => {
  const { setIsUserLogin, setUserName, userName } = useContext(LoginContext);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const submitUserName = (event) => {
    event.preventDefault();
    setIsUserLogin(Boolean(userName?.length)); //if user enter name then set it true
  };
  return (
    <>
      <div className="context">
        <div className="area p-3">
          <div
            id="ndrsl-wol-642bf4af00fc6f440d203953"
            className="ndrsl-widget"
          ></div>

          <div className="usename-box ">
            <h5 className="card-title text-center ">Welcome To MateSpace</h5>

            <form onSubmit={submitUserName} className="d-lg-flex d-md-flex justify-content-center">
              <div className="div-center ">
              <input
                type={"text"}
                placeholder="Enter Your Name"
                className="form-control"
                onChange={onChangeUserName}
                />
                </div>
              <div className="div-center">
                <button
                  type="submit"
                  className="btn btn-primary mx-2 my-2 my-lg-0 my-xl-0 my-xxl-0 my-md-0 d-flex align-items-center justify-content-center w-100"
                >
                  Go <ArrowRight className="ms-2" />
                </button>
              </div>
            </form>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "10px",
              fontSize: "0.8rem",
            }}
          >
            Made With <strong>💙</strong>
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
