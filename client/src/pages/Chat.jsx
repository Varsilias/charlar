import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import Users from "../components/Users";
import api from "../utils/api-routes";
import Base from "../components/Base";
import ChatWindow from "../components/ChatWindow";
import { ThreeDots } from "react-loader-spinner";
import { io } from "socket.io-client";
const serverUri = import.meta.env.VITE_APP_API_BASE_URL;

const Chat = () => {
  let socketURL = serverUri.split("/").slice(0, 3).join("/");
  const socket = useRef();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState({});
  const [chat, setChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      setMe((prev) => ({ ...prev, ...user }));
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await api.fetchUsers(me.id);
      let { success, message, data } = resp;
      console.log(data);

      if (!success) {
        toast.error(message);
      }
      setUsers(data);
    };

    if (Object.keys(me) === 0) {
      navigate("/set-avatar");
    } else {
      setTimeout(() => {
        fetchUsers();
      }, 3000);
    }
  }, [me]);

  useEffect(() => {
    if (me) {
      socket.current = io(socketURL);
      socket.current.emit("user_added", me.id);
    }
  }, [me]);

  const handleChatChange = (chat) => {
    setChat(chat);
  };

  return (
    <Container>
      {users && users.length >= 1 ? (
        <>
          <div className="container">
            <Users users={users} me={me} changeChat={handleChatChange} />
            {isLoaded && !chat ? (
              <Base me={me} />
            ) : (
              <ChatWindow currentChat={chat} me={me} socket={socket} />
            )}
          </div>
        </>
      ) : (
        <Loader>
          <ThreeDots
            height="180"
            width="180"
            radius="12"
            color="#9a86f3"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </Loader>
      )}
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const Loader = styled.div`
  display: flex;
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export default Chat;
