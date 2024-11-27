import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Box,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { emailValidator, passwordValidator } from "../utils/validators";

import logo from "../assets/images/movies-logo.jpg";
import { useDispatch } from "react-redux";
import {  userExist } from "../Redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("", passwordValidator);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email: email.value,
          password: password.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status) {
        localStorage.setItem("auth", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch(userExist(data.user));
        toast.success(data.message);

        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container spacing={0} sx={{ height: "100vh", background: "#121212" }}>
      {/* Left Panel */}
      <Grid
        item
        md={6}
        display={{ xs: "none", sm: "none", md: "block" }}
        sx={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/movie-backdrop.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Movies App" style={{ width: 200, marginBottom: 20 }} />
          <Typography
            variant="h4"
            color="white"
            textAlign="center"
            sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Welcome to Movies Hub
          </Typography>
          <Typography
            variant="body1"
            color="white"
            textAlign="center"
            sx={{ mt: 2, textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
          >
            Stream your favorite movies and TV shows anytime, anywhere.
          </Typography>
        </Box>
      </Grid>

      {/* Right Panel */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            height: "100%",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: 3, md: 5 },
              width: "100%",
              backgroundColor: "#1e1e1e",
              color: "white",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
            }}
          >
            <Typography component="h1" variant="h5" textAlign="center" marginBottom={2} fontWeight="bold">
              Login to Movies Hub
            </Typography>
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <TextField
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff5722",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5722",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={password.changeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibilityToggle} edge="end" sx={{ color: "white" }}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff5722",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5722",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  marginTop: 3,
                  backgroundColor: "#ff5722",
                  color: "white",
                  fontSize: "16px",
                  height: "50px",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#e64a19",
                  },
                }}
              >
                Login
              </Button>
              <Typography textAlign="center" marginTop={2}>
                <Link href="/forgetPassword" underline="hover"
                color= "primary.main">
                  Forgot Password?
                </Link>
              </Typography>
              <Typography textAlign="center" marginTop={3}>
                Don't have an account?{" "}
                <Link href="/register" underline="hover"
                color="primary.main">
                  Sign up
                </Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
