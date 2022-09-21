import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import api from "../utils/api-routes";

const ChatWindow = ({ currentChat, me, socket }) => {
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    try {
      const data = { from: me.id, to: currentChat._id, message: msg };
      console.log(data);
      const res = await api.createMessage(data);
      // const { success, message: response_message, data: result } = res;
      // console.log(res);
      socket.current.emit("message_sent", data);
      const msgs = [...messages];
      msgs.push({ from_me: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProjectMessage = async () => {
      try {
        const data = { from: me.id, to: currentChat._id };
        const { success, message, data: result } = await api.fetchMessage(data);
        if (!success) {
          console.log(message);
          return;
        }
        console.log(result);
        setMessages(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectMessage();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message_received", (msg) => {
        setReceivedMessage({ from_me: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    receivedMessage && setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatar}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div key={uuidv4()} ref={scrollRef}>
              <div
                className={`message ${message.from_me ? "sent" : "recieved"}`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatWindow;
