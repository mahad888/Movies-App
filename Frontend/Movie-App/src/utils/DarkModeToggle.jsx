import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Switch, Typography } from "@mui/material";
import { toggleDarkMode } from "../Redux/reducers/auth";

const DarkModeToggle = () => {
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>{isDarkMode ? "Dark" : "Light"} Mode</Typography>
      <Switch checked={isDarkMode} onChange={handleToggle} />
    </div>
  );
};

export default DarkModeToggle;
