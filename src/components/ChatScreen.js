import "../chat.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import AllChats from "./AllChats";
import CurrentChat from "./CurrentChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ChatScreen = () => {
  const location = useLocation();
  const token = location.state?.token;
  const email = location.state?.email;
  const [receiverId, setReceiverId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const receiver = (email, id) => {
    setReceiverEmail(email);
    setReceiverId(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/allusers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching all users:", error.message);
      }
    };
    fetchData();
  }, [token]);
  return (
    <div className="chatscreen">
      <div className="all-chat">
        <Avatar
          alt="Remy Sharp"
          src="https://media.licdn.com/dms/image/C510BAQFeZoxtBmtekg/company-logo_200_200/0/1630585633558/mindpeersco_logo?e=1708560000&v=beta&t=9QAAu8T7PuwLJJK1RUpHwgBscZ7cvWocQNzQAoZN0Zs"
          sx={{ width: 100, height: 100 }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <div className="chat-name">
          {allUsers
            .filter((item) => item.email !== email)
            .map((item) => (
              <AllChats
                key={item.email}
                email={item.email}
                id={item._id}
                receiver={receiver}
              />
            ))}
        </div>
      </div>
      <div className="current-chat">
        <CurrentChat receiverEmail={receiverEmail} receiverId={receiverId} />
      </div>
    </div>
  );
};
export default ChatScreen;
