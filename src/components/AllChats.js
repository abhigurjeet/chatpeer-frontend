import Avatar from "@mui/material/Avatar";

const AllChats = (props) => {
  const email = props.email;
  return (
    <div className="chats" onClick={() => props.receiver(email, props.id)}>
      <Avatar
        sx={{
          bgcolor: "#FFC5C5",
          color: "#89B9AD",
          margin: "auto",
        }}
      >
        {email[0]}
      </Avatar>
      <p>{email}</p>
    </div>
  );
};

export default AllChats;
