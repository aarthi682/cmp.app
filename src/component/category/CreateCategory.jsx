import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { CmpService } from "../../service/CmpService";
import { useNavigate } from "react-router-dom";

export const CreateCategory = () => {
  const userId = localStorage.getItem("userId");
const navigate=useNavigate();
  const [category, setCategory] = useState({
    categoryType: "",
    discription: "",
    points: "",
    createdBy: userId,
    userId: userId,
  });

  const [error, setError] = useState({});

  const validation = () => {
    const newError = {};

    if (!category.categoryType.trim()) {
      newError.categoryType = "Category type is required";
    } else if (!/^[A-Za-z ]+$/.test(category.categoryType)) {
      newError.categoryType = "Only alphabets allowed";
    }

    if (!category.discription.trim()) {
      newError.discription = "Description is required";
    } else if (!/^[A-Za-z ]+$/.test(category.discription)) {
      newError.discription = "Only alphabets allowed";
    }

    if (!category.points.trim()) {
      newError.points = "Points are required";
    } else if (!/^[0-9]+$/.test(category.points)) {
      newError.points = "Only digits allowed";
    }

    return newError;
  };

  const onHandling = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandlingSubmit = async (e) => {
    e.preventDefault();
    const validations = validation();
    setError(validations);

    if (Object.keys(validations).length > 0) return;

    try {
      const response = await CmpService.createCategory(category);

      if (response.data.Status === "Success") {
        alert("Category created successfully");
        navigate("/fetchAllCategory")
        
        setCategory({
          categoryType: "",
          discription: "",
          points: "",
          createdBy: userId,
          userId: userId,
        });
        setError({});
      } else if (response.data.Status === "Fail") {
        alert("Category already exists");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <Box
      className="vh-100 d-flex justify-content-center align-items-center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create New Category
        </Typography>

        <form onSubmit={onHandlingSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Category Type"
              name="categoryType"
              value={category.categoryType}
              onChange={onHandling}
              error={!!error.categoryType}
              helperText={error.categoryType}
              fullWidth
            />

            <TextField
              label="Description"
              name="discription"
              value={category.discription}
              onChange={onHandling}
              error={!!error.discription}
              helperText={error.discription}
              fullWidth
            />

            <TextField
              label="Points"
              name="points"
              value={category.points}
              onChange={onHandling}
              error={!!error.points}
              helperText={error.points}
              fullWidth
              type="number"
            />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
