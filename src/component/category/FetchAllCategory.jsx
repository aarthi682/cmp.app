import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

export const FetchAllCategory = () => {
  const [categoryAll, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const response = await CmpService.fetchAllCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await CmpService.deleteCategory(categoryId);
      alert("Category deleted successfully");
      fetchAll();
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Something went wrong while deleting the category");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="All Categories"
        action={
          <Button variant="contained" color="primary" onClick={() => navigate("/createCategory")}>
            Add Category
          </Button>
        }
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>CategoryId</TableCell>
                <TableCell sx={{ color: "white" }}>CategoryType</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Points</TableCell>
                <TableCell sx={{ color: "white" }}>CreateDate</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedDate</TableCell>
                <TableCell sx={{ color: "white" }}>CreatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryAll.length > 0 ? (
                categoryAll.map((category) => (
                  <TableRow
                    key={category.categoryId}
                    hover
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(190, 50, 157, 0.1)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{category.categoryId}</TableCell>
                    <TableCell>{category.categoryType}</TableCell>
                    <TableCell>{category.discription}</TableCell>
                    <TableCell>{category.points}</TableCell>
                    <TableCell>{formatDate(category.createdAt)}</TableCell>
                    <TableCell>{formatDate(category.updatedAt)}</TableCell>
                    <TableCell>{category.createdBy}</TableCell>
                    <TableCell>{category.updatedBy}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => navigate(`/updateCategory/${category.categoryId}`)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(category.categoryId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
