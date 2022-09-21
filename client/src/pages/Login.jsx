import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/Char.png";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api-routes";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
    progress: undefined,
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateInput = () => {
    const { password, username } = inputs;

    if (password.length < 8) {
      toast.error(
        "Password field must be greater than 8 characters",
        toastOptions
      );
      return false;
    } else if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateInput()) {
        const resp = await api.login(inputs);
        let { success, message, data } = resp;
        console.log(resp);

        if (!success) {
          toast.error(message, toastOptions);
        } else {
          toast.success("Sign up Successful", toastOptions);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message, toastOptions);
    }
  };
  return localStorage.getItem("user") ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand-info">
            <img src={logo} alt="brand-image" width="50px" height="50px" />
            <h1>Charlar</h1>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            value={inputs.username}
            placeholder="Enter your username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            value={inputs.password}
            id="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Sign in</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      border-radius: 50%;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      padding: 0.8rem;
      border: 0.1rem solid #4e0ffd;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff92;
      }
    }
    p {
      text-align: center;
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
