import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Switch,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, MessageRounded, Notifications, Help, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../Redux/reducers/auth"; // Import your Redux dark mode action
import logo from "../assets/images/movies-logo.jpg"; // Replace with the correct path to your logo

const AppBarComponent = ({ user, isEditProfile, handleEditProfile }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    console.log("Drawer toggle clicked");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    dispatch(toggleDarkMode()); // Call Redux action to toggle dark mode globally
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <img
          src={logo}
          alt="Movieshub Logo"
          style={{ height: "60px", marginRight: "10px", borderRadius: "30%" }}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        {/* Dark Mode Toggle */}
        <Tooltip title="Toggle Dark Mode">
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="default"
            inputProps={{ "aria-label": "dark mode toggle" }}
          />
        </Tooltip>

        {/* Favorite Movies */}
        <Tooltip title="Favorite Movies">
          <IconButton
            onClick={() => navigate("/favorites")} // Adjust the route to your Favorites page
            color="inherit"
          >
            <Favorite sx={{ fontSize: "25px", color: "red" }} />
          </IconButton>
        </Tooltip>

        {/* Message Icon */}
        <Tooltip title="Messages">
          <IconButton onClick={handleClick}>
            <MessageRounded sx={{ fontSize: "25px", color: "black", mr: 2 }} />
          </IconButton>
        </Tooltip>

        {/* Popover or Dropdown for Messages */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleClose}>Message from John</MenuItem>
          <MenuItem onClick={handleClose}>Meeting Reminder</MenuItem>
          <MenuItem onClick={handleClose}>New Task Assigned</MenuItem>
        </Menu>

        {/* Notifications and Help Icons */}
        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <Notifications sx={{ fontSize: "25px", mr: 2 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Help">
          <IconButton color="inherit">
            <Help sx={{ fontSize: "25px", mr: 2 }} />
          </IconButton>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip title="Edit Profile">
          <Avatar
            alt="Profile"
            src={user?.avatar?.url || "/default-avatar.png"}
            onClick={handleEditProfile}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>

        {isEditProfile && (
          <React.Suspense fallback={<Backdrop open />}>
            <EditProfile />
          </React.Suspense>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
