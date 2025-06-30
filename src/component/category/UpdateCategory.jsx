import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { CmpService } from "../../service/CmpService";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateCategory = () => {
  const userId = localStorage.getItem("userId");
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryType: "",
    discription: "",
    points: "",
    updatedBy: userId,
    userId: userId,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await CmpService.getByIdCategory(categoryId);
        const data = response.data;

        setCategory({
          categoryType: data.categoryType || "",
          discription: data.discription || "",
          points: data.points || "",
          updatedBy: userId,
          userId: data.userId || userId,
        });
      } catch (error) {
        console.error("Failed to fetch category:");
        alert("Error loading category details.");
      }
    };

    fetchCategory();
  }, [categoryId, userId]);

  const onHandling = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandlingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CmpService.updateCategory(categoryId, category);
      console.log(" Update response:", response.data);
      alert("Category updated successfully");
     navigate("/fetchAllCategory");

    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Something went wrong while updating the category.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h4 className="mb-4 text-center">Update Category</h4>
        <Form onSubmit={onHandlingSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Category Type</FormLabel>
            <FormControl
              type="text"
              name="categoryType"
              value={category.categoryType}
              onChange={onHandling}
              placeholder="Enter the category type"
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <FormControl
              type="text"
              name="discription"
              value={category.discription}
              onChange={onHandling}
              placeholder="Enter the description"
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Points</FormLabel>
            <FormControl
              type="text"
              name="points"
              value={category.points}
              onChange={onHandling}
              placeholder="Enter the points"
            />
          </FormGroup>

          <div className="text-center">
            <Button type="submit" variant="primary">Update</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
