import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (confirmPasswordRef.current.value === passwordRef.current.value) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        await axios
          .post(`${process.env.REACT_APP_API_URL}/login`, {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
          .then((response) => {
            const authorizationHeader = response.headers.authorization;
            if (authorizationHeader) {
              navigate("/chatscreen", {
                state: {
                  email: emailRef.current.value,
                  token: authorizationHeader,
                },
              });
            }
          });
      } catch (error) {
        toast.error(JSON.parse(error.request.responseText).error);
        console.error("Error:", error.message);
      }
    } else {
      alert("passwords not matching");
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "40vh",
        margin: "4% auto",
      }}
    >
      <Toaster toastOptions={{ duration: 1000 }} />
      <Avatar
        alt="Remy Sharp"
        src="https://media.licdn.com/dms/image/C510BAQFeZoxtBmtekg/company-logo_200_200/0/1630585633558/mindpeersco_logo?e=1708560000&v=beta&t=9QAAu8T7PuwLJJK1RUpHwgBscZ7cvWocQNzQAoZN0Zs"
        sx={{ width: 100, height: 100 }}
      />

      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Email"
        placeholder="Enter email id"
        inputRef={emailRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        inputRef={passwordRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Confirm Password"
        type="password"
        inputRef={confirmPasswordRef}
      />
      <Button onClick={handleSubmit} variant="contained">
        Sign Up
      </Button>
      <Link href="/">Already have an account? Log in</Link>
    </Container>
  );
}

export default SignUp;
