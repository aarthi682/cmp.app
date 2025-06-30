import { useState, useEffect } from "react";
import { CmpService } from "../../service/CmpService";
import { Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Container } from "@mui/material";

export const CreateContent = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [content, setContent] = useState({
    content: {
      questionId: "",
      text: "",
      options: { a: "", b: "", c: "", d: "" },
      correctOption: "",
      duration: "",
      description: ""
    },
    userId: userId,
    categoryId: ""
  });

  const [errors, setErrors] = useState({});
  const [categoryAll, setCategory] = useState([]);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const response = await CmpService.fetchAllCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validateFields = () => {
    const c = content.content;
    const newErrors = {};

    if (!c.questionId) newErrors.questionId = "Question ID is required.";
    if (!c.text) newErrors.text = "Question text is required.";
    if (!c.options.a) newErrors.a = "Option A is required.";
    if (!c.options.b) newErrors.b = "Option B is required.";
    if (!c.options.c) newErrors.c = "Option C is required.";
    if (!c.options.d) newErrors.d = "Option D is required.";
    if (!c.correctOption) newErrors.correctOption = "Correct option is required.";
    if (!c.duration) newErrors.duration = "Duration is required.";
    if (!c.description) newErrors.description = "Description is required.";
    if (!content.categoryId) newErrors.categoryId = "Category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const onSubmitHandling = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const response = await CmpService.createContent(content);
      if (response.data?.Status === "Seccuss") {
        alert("Content created successfully");
        navigate("/fetchAllContent");
      } else {
        alert("Failed to create content");
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
          Create New Content
        </Typography>


        <Form onSubmit={onSubmitHandling}>
            <FormGroup className="mb-3">
            <FormLabel>Select Category</FormLabel>
            <FormControl
              as="select"
              name="categoryId"
              value={content.categoryId}
              onChange={onHandling}
              isInvalid={!!errors.categoryId}
            >
              <option value="">-- Select Category --</option>
              {categoryAll.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryType}
                </option>
              ))}
            </FormControl>
            <Form.Text className="text-danger">{errors.categoryId}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Question ID</FormLabel>
            <FormControl
              type="text"
              value={content.content.questionId}
              onChange={(e) => onContentChange("questionId", e.target.value)}
              isInvalid={!!errors.questionId}
            />
            
            <Form.Text className="text-danger">{errors.questionId}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Question Text</FormLabel>
            <FormControl
              type="text"
              value={content.content.text}
              onChange={(e) => onContentChange("text", e.target.value)}
              isInvalid={!!errors.text}
            />
            <Form.Text className="text-danger">{errors.text}</Form.Text>
          </FormGroup>

          {["a", "b", "c", "d"].map((opt) => (
            <FormGroup className="mb-3" key={opt}>
              <FormLabel>Option {opt.toUpperCase()}</FormLabel>
              <FormControl
                type="text"
                value={content.content.options[opt]}
                onChange={(e) => onOptionChange(opt, e.target.value)}
                isInvalid={!!errors[opt]}
              />
              <Form.Text className="text-danger">{errors[opt]}</Form.Text>
            </FormGroup>
          ))}

          <FormGroup className="mb-3">
            <FormLabel>Correct Option</FormLabel>
            <FormControl
              type="text"
              value={content.content.correctOption}
              onChange={(e) => onContentChange("correctOption", e.target.value)}
              isInvalid={!!errors.correctOption}
            />
            <Form.Text className="text-danger">{errors.correctOption}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Duration (seconds)</FormLabel>
            <FormControl
              type="number"
              value={content.content.duration}
              onChange={(e) => onContentChange("duration", e.target.value)}
              isInvalid={!!errors.duration}
            />
            <Form.Text className="text-danger">{errors.duration}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              value={content.content.description}
              onChange={(e) => onContentChange("description", e.target.value)}
              isInvalid={!!errors.description}
            />
            <Form.Text className="text-danger">{errors.description}</Form.Text>
          </FormGroup>

        
          <Button variant="primary" type="submit" className="w-100 mt-2">
            Submit
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};
