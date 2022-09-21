import React from "react";
import styled from "styled-components";
import Gif from "../assets/robot.gif";

const Base = ({ me }) => {
  return (
    <Container>
      <img src={Gif} alt="" />
      <h1>
        Welcome, <span>{me.username}!</span>
      </h1>
      <h3>Please select a user to start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Base;
