import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

export const CusterHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const navLinks = [
    { label: "Register", path: "/register" },
    { label: "Login", path: "/login" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, rgb(241, 236, 243))",
        boxShadow: 1,
        minHeight: "60px",
        justifyContent: "center",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button_100456-6868.jpg"
            alt="Logo"
            style={{ height: "40px", width: "40px", borderRadius: "5px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Georgia, serif",
              fontVariant: "small-caps",
              color: "rgb(136, 59, 151)",
            }}
          >
            CMP
          </Typography>
        </Box>

        {/* Only Register and Login */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1,
                fontFamily: "Georgia, serif",
                fontVariant: "small-caps",
                color: isActive(link.path) ? "white" : "rgb(223, 97, 194)",
                backgroundColor: isActive(link.path)
                  ? "rgb(196, 160, 199)"
                  : "transparent",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: isActive(link.path)
                    ? "rgb(196, 160, 199)"
                    : "rgb(230, 202, 219)",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
