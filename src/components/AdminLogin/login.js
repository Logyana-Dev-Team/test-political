import React, { useState, useEffect } from "react";
import "../../css/main.css";
import { NavLink } from "react-router-dom";
import{ useForm }from 'react-hook-form';
import axios from "axios";

//check whole code ...needs a lot of changes
const UserLogin = () => {
  const {register, handleSubmit, errors}=useForm();
  const initialState = localStorage.getItem("token");
  const [custToken, setCustToken] = useState(initialState);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  // useEffect(() => {
  //   if (custToken) window.location = "/";
  // }, [custToken]);

  // const inputEvent = (e) => {
  //   const { name, value } = e.target;

  //   setUser((preValue) => {
  //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });
  // };

  const onSubmit = (user) => {
    // e.preventDefault();
    // console.log(user); // sent object
    // axios
    //   .post("/users/login", {
    //     email: user.email,
    //     password: user.password,
    //   })
    //   .then((response) => {
    //     // console.log(response.data);
    //     // console.log(response.data.token);
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("userId", response.data.userId);
    //     // setCustToken(response.data);
    //     window.location = "/";
    //   })
    //   .catch((error) => {
    //    alert("wrong email or password")
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">
                      Welcome to Travelgram
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                      <div className="form-label-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Your EmailID"
                          ref={register({required:true}) }
                          // onChange={inputEvent}
                          // value={user.email}
                          autoFocus
                        />
                        {errors.email && <p style={{color:"red", fontSize:"small"}}>This Field is required</p>}
                      </div>

                      <div className="form-label-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Your password"
                          ref={register({required:true})}
                          // onChange={inputEvent}
                          // value={user.password}
                        />
                         {errors.password &&<p style={{color:"red", fontSize:"small"}}>This field is required</p>}
                      </div>

                     
                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        LOGIN
                      </button>
                      <div className="text-center">
                       

                        <NavLink
                          exact
                          to="usersignup"
                          className="text-decoration-none"
                        >
                          <button
                            className="btn btn-lg  mt-5 btn-warning btn-block btn-login text-uppercase font-weight-bold mb-2"
                            type="button"
                          >
                            Register
                          </button>
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;