import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { CmpService } from "../service/CmpService"; // ✅ Adjust path if needed

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [anchorEl, setAnchorEl] = useState(null); // for dropdown open/close
  const [categories, setCategories] = useState([]); // dynamic categories
  const open = Boolean(anchorEl);

  // Nav links excluding QuizType
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "User Details", path: "/registerFetchAll" },
    { label: "Category", path: "/fetchAllCategory" },
    { label: "Content", path: "/fetchAllContent" },
    // { label: "Register", path: "/register" },
    // { label: "Login", path: "/login" },
      {label: "User QuiZ History", path:"/fetchAllUserhistory"},
      {label:"grantUserGift" , path:"/fetchAllAssigned"},
      {label:"Rewards", path:"/fetchAllReward"}
  ];

  const isActive = (path) => currentPath === path;

  // Fetch categories for QuizType dropdown
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await CmpService.fetchAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchAll();
  }, []);

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
          src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button_100456-6868.jpg?ga=GA1.1.942363521.1750751950&semt=ais_items_boosted&w=740"
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

        {/* Navigation */}
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

          {/* QuizType Dropdown */}
          <Box>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1,
                fontFamily: "Georgia, serif",
                fontVariant: "small-caps",
                color: open ? "white" : "rgb(223, 97, 194)",
                backgroundColor: open
                  ? "rgb(196, 160, 199)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "rgb(230, 202, 219)",
                },
              }}
            >
              QuizType
            </Button>
           <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={() => setAnchorEl(null)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
>
  {categories.map((cat) => (
   <MenuItem
  key={cat.categoryId}
  component={Link}
  to={`/quizType/${cat.categoryId}/${new Date().toISOString().split("T")[0]}`}
  onClick={() => setAnchorEl(null)}
>
  {cat.categoryType}
</MenuItem>
  ))}
</Menu>

          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
