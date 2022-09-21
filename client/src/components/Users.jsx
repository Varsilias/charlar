import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/Char.png";

const Users = ({ users, me, changeChat }) => {
  const [myDetails, setMyDetails] = useState({ username: "", avatar: "" });
  const [correspondent, setCorrespondent] = useState(null);

  useEffect(() => {
    if (me) {
      setMyDetails((prev) => ({
        ...prev,
        username: me.username,
        avatar: me.avatar,
      }));
    }
  }, [me]);

  const switchCorrespondent = (i, user) => {
    setCorrespondent(i);
    changeChat(user);
  };

  return (
    <>
      {myDetails.username && myDetails.avatar && (
        <Container>
          <div className="brand-info">
            <img src={logo} alt="brand-image" />
            <h3>Charlar</h3>
          </div>

          {users?.length > 0 ? (
            <>
              <div className="contacts">
                {users.map((user, index) => (
                  <div
                    onClick={() => switchCorrespondent(index, user)}
                    className={`contact ${
                      index === correspondent ? "selected" : ""
                    }`}
                    key={index}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${user.avatar}`}
                        alt="profile-photo"
                      />
                    </div>
                    <div className="username">
                      <h3>{user.username}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="me">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${me.avatar}`}
                    alt="profile-photo"
                  />
                </div>
                <div className="username">
                  <h3>{me.username}</h3>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>No one is online</p>
              <div className="me">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${me.avatar}`}
                    alt="profile-photo"
                  />
                </div>
                <div className="username">
                  <h3>{me.username}</h3>
                </div>
              </div>
            </>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    border-bottom: 0.3rem solid #0d0d30;
    margin-bottom: 0.5rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .me {
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

  p {
    color: white;
    text-align: center;
    text-transform: uppercase;
  }

  .me {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Users;
