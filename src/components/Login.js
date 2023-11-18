import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        const authorizationHeader = response.headers["authorization"];
        if (authorizationHeader) {
          navigate("/chatscreen", {
            state: { email, token: authorizationHeader },
          });
        }
      })
      .catch((error) => {
        toast.error(JSON.parse(error.request.responseText).error);
        console.error("Error:", error);
      });
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
        Sign In
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Email"
        autoComplete="off"
        placeholder="Enter email id"
        inputRef={emailRef}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="off"
        inputRef={passwordRef}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Link href="/signup">Don't have an account? Sign up</Link>
    </Container>
  );
}

export default Login;
