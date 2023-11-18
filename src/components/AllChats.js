import Avatar from "@mui/material/Avatar";

const AllChats = (props) => {
  const email = props.email;
  return (
    <div className="chats" onClick={() => props.receiver(email)}>
      <Avatar
        sx={{
          bgcolor: "#FFC5C5", // Set the desired background color
          color: "#89B9AD", // Set the desired text color
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
