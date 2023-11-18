import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const CurrentChat = (props) => {
  const location = useLocation();
  const token = location.state?.token;
  const email = location.state?.email;
  const msgRef = useRef(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_URL}`);

    // Listen for 'message' event from the server
    socket.on("message", (message) => {
      console.log(message);
      if (message.email === email) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/getmessages`,
            {
              sender: email,
              receiver: props.receiverEmail,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => setMessages(res.data))
          .catch((error) => console.log(error.message));
      }
      setMessages((prevMessages) => [...prevMessages, message.msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getmessages`,
        {
          sender: email,
          receiver: props.receiverEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setMessages(res.data))
      .catch((error) => console.log(error.message));
  }, [email, props.receiverEmail, token]);
  const handleSend = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/createmessage`,
        {
          sender: email,
          receiver: props.receiverEmail,
          content: msgRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const socket = io(`${process.env.REACT_APP_API_URL}`);
        socket.emit("sendMessage", {
          email: props.receiverEmail,
          msg: res.data,
        });
        msgRef.current.value = "";
      })
      .catch((error) => console.log(error.message));
    msgRef.current.value = "";
  };

  return (
    <div>
      <div className="current-chat-head">
        <Avatar
          sx={{
            bgcolor: "#FFC5C5",
            color: "#89B9AD",
            margin: "1%",
          }}
        >
          {props.receiverEmail[0]}
        </Avatar>
        <p>{props.receiverEmail}</p>
      </div>
      <div className="chat-window">
        {messages.map((item) => {
          if (props.receiverId === item.receiver)
            return <p className="message">{item.content}</p>;
          else return <p className="message-reply">{item.content}</p>;
        })}
      </div>
      <div>
        <TextField
          sx={{
            width: "80%",
            color: "#89B9AD",
            margin: "auto",
          }}
          placeholder="Enter your Message"
          inputRef={msgRef}
        />
        <Button
          onClick={handleSend}
          sx={{ width: "20%", height: "50px" }}
          variant="contained"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
export default CurrentChat;
