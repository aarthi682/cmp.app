import { useState, useEffect } from "react";
import { CmpService } from "../../service/CmpService";
import { Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Typography, Container } from "@mui/material";

export const UpdateContent = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const storedUserId = localStorage.getItem("userId");

  const [content, setContent] = useState({
    content: {
      questionId: "",
      text: "",
      options: { a: "", b: "", c: "", d: "" },
      correctOption: "",
      duration: "",
      description: ""
    },
    userId: storedUserId,
    categoryId: ""
  });

  const [categoryAll, setCategoryAll] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [contentResponse, categoryResponse] = await Promise.all([
          CmpService.fetchByIdConetnt(contentId),
          CmpService.fetchAllCategory()
        ]);

        const updatedContent = {
          ...contentResponse.data,
          userId: storedUserId 
        };

        setContent(updatedContent);
        setCategoryAll(categoryResponse.data);
      } catch (error) {
        alert("Something went wrong while fetching content/category data");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [contentId, storedUserId]);

  const onContentChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  const onOptionChange = (option, value) => {
    setContent((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        options: { ...prev.content.options, [option]: value }
      }
    }));
  };

  const onHandling = (e) => {
    const { name, value } = e.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateFields = () => {
    const c = content.content;
    return (
      c.questionId &&
      c.text &&
      c.correctOption &&
      c.duration &&
      c.description &&
      c.options.a &&
      c.options.b &&
      c.options.c &&
      c.options.d &&
      content.categoryId
    );
  };

  const onSubmitHandling = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const contentWithUserId = {
        ...content,
        userId: storedUserId 
      };

      const response = await CmpService.updatedByIdConetnt(contentId, contentWithUserId);
      console.log("updateContent response:", response);

      if (response.data?.Status === "Success") {
        alert("Content updated successfully");
        navigate("/fetchAllContent");
      } else {
        alert("Failed to update content");
      }
    } catch (error) {
      console.error("Error submitting content:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4, maxHeight: "80vh", overflowY: "auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Content
        </Typography>

        <Form onSubmit={onSubmitHandling}>
          <FormGroup className="mb-3">
            <FormLabel>Question ID</FormLabel>
            <FormControl
              type="text"
              value={content.content.questionId}
              onChange={(e) => onContentChange("questionId", e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Question Text</FormLabel>
            <FormControl
              type="text"
              value={content.content.text}
              onChange={(e) => onContentChange("text", e.target.value)}
            />
          </FormGroup>

          {["a", "b", "c", "d"].map((opt) => (
            <FormGroup className="mb-3" key={opt}>
              <FormLabel>Option {opt.toUpperCase()}</FormLabel>
              <FormControl
                type="text"
                value={content.content.options[opt]}
                onChange={(e) => onOptionChange(opt, e.target.value)}
              />
            </FormGroup>
          ))}

          <FormGroup className="mb-3">
            <FormLabel>Correct Option</FormLabel>
            <FormControl
              type="text"
              value={content.content.correctOption}
              onChange={(e) => onContentChange("correctOption", e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Duration (seconds)</FormLabel>
            <FormControl
              type="number"
              value={content.content.duration}
              onChange={(e) => onContentChange("duration", e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              value={content.content.description}
              onChange={(e) => onContentChange("description", e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Select Category</FormLabel>
            <FormControl
              as="select"
              name="categoryId"
              value={content.categoryId}
              onChange={onHandling}
            >
              <option value="">-- Select Category --</option>
              {categoryAll.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryType}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Update
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};
