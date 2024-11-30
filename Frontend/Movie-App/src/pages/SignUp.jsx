import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import {
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFileHandler, useInputValidation } from "6pp";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../utils/validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/movies-logo.jpg";
import toast from "react-hot-toast";

const SignUp = () => {
  const name = useInputValidation("", nameValidator);
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("", passwordValidator);
  const confirmPassword = useInputValidation("", (value) => {
    if (value !== password.value) {
      return { isValid: false, errorMessage: "Passwords do not match" };
    }
    return { isValid: true, errorMessage: "" };
  });

  const gender = useInputValidation("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("confirmPassword", confirmPassword.value);
      formData.append("name", name.value);
      formData.append("gender", gender.value);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": 'application/json' },
        }
      );

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: "16px",
          mt: 10,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          backgroundColor: "#000000",
          color: "#f9f9f9",
        }}
      >
        {/* Logo */}
        <Avatar
          src={logo}
          alt="App Logo"
          sx={{ width: 80, height: 80, margin: "auto" }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ mt: 2, fontWeight: "bold" ,color: "#f9f9f9",}}
        >
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
          Join us today!
        </Typography>

        <form onSubmit={handleRegister} style={{ marginTop: "1.5rem" }}>
         

          {/* Full Name */}
          <TextField
            label="Full Name"
            fullWidth
            value={name.value}
            onChange={name.changeHandler}
            error={!!name.error}
            helperText={name.error}
            InputProps={{
              style: { color: "white" },
            }}
            margin="normal"
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

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            value={email.value}
            onChange={email.changeHandler}
            error={!!email.error}
            helperText={email.error}
            margin="normal"
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

          {/* Password */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password.value}
            onChange={password.changeHandler}
            error={!!password.error}
            helperText={password.error}
            margin="normal"
           
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
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

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={confirmPassword.value}
            onChange={confirmPassword.changeHandler}
            error={!!confirmPassword.error}
            helperText={confirmPassword.error}
            margin="normal"
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

          {/* Gender */}
          <TextField
            select
            label="Gender"
            fullWidth
            value={gender.value}
            onChange={gender.changeHandler}
            margin="normal"
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
           

          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>

          </TextField>

        
          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
            Register
          </Button>

          {/* Link to Login */}
          <Typography sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button
              component="a"
              href="/login"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
