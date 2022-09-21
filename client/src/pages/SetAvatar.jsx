import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api-routes";
import axios from "axios";
import { Buffer } from "buffer";
const baseurl = import.meta.env.VITE_APP_AVATAR_BASE_URL;

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAvatars() {
      const avatarsArray = [];

      for (let i = 0; i < 5; i++) {
        let rand = Math.round(Math.random() * 1000);
        const res = await axios.get(`${baseurl}/${rand}`);
        const buffer = Buffer.from(res.data);
        avatarsArray.push(buffer.toString("base64"));
      }
      setAvatars(avatarsArray);
      setLoading(false);
    }

    fetchAvatars();
  }, []);

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

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar before proceeding", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const resp = await api.setAvatar(user.id, {
        avatar: avatars[selectedAvatar],
      });
      let { success, message, data } = resp;
      console.log(resp);

      if (!success) {
        toast.error(message);
      }

      if (data && data.avatar_present) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/", { replace: true });
      } else {
        toast.error(
          "Error setting profile photo. Please try again",
          toastOptions
        );
      }
    }
  };

  return (
    <>
      {loading ? (
        <Container>
          <img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="info">
            <h1>Select an avatar. This avatar would be your profile image</h1>
          </div>

          <div className="avatars">
            {avatars.length === 0
              ? null
              : avatars.map((avatar, i) => {
                  return (
                    <div
                      key={i}
                      className={`avatar ${
                        selectedAvatar === i ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="profile-photo"
                        onClick={() => setSelectedAvatar(i)}
                      />
                    </div>
                  );
                })}
          </div>
          <button className="submit-btn" onClick={() => setProfilePicture()}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .info {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    padding: 0.8rem;
    border: 0.1rem solid #4e0ffd;
    border-radius: 0.4rem;
    color: white;
    /* width: 100%; */
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff92;
    }
  }
`;

export default SetAvatar;
