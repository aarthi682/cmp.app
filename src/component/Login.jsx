import { useState } from "react";
import { CmpService } from "../service/CmpService";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [logIn, setLogIn] = useState({
    emailId: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const onHandling = (e) => {
    const { name, value } = e.target;
    setLogIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validation = () => {
    const newError = {};
    if (!logIn.emailId.trim()) {
      newError.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(logIn.emailId)) {
      newError.emailId = "Invalid email format";
    }

    if (!logIn.password.trim()) {
      newError.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(logIn.password)
    ) {
      newError.password =
        "Password must be at least 6 characters with 1 letter, 1 number, and 1 special character";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const onSubmitHandling = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const response = await CmpService.logInCreate(logIn);
      if (response.data.Status === "Success") {
        const { roleId, userId, Name } = response.data;

        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", Name);

        roleId === 1 ? navigate("/") : navigate("/registerFetchAll");

        setLogIn({ emailId: "", password: "" });
      } else if (response.data.Status === "Fail") {
        alert("Email ID not found");
        navigate("/register");
      } else {
        alert("Check email ID and password");
      }
    } catch (error) {
      alert("Something went wrong during login.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
       // backgroundColor: "#f8f9fa", // optional: remove this if you want transparent
      }}
    >
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img
src="https://img.freepik.com/free-photo/view-3d-button_23-2149917544.jpg?ga=GA1.1.942363521.1750751950&semt=ais_items_boosted&w=740"              alt="Login Illustration"
              style={{
                width: "100%",
                height:"500px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Card
  className="shadow p-4 mx-auto"
  style={{
    width: "100%",
    maxWidth: "350px", 
    borderRadius: "12px",
  }}
>
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={onSubmitHandling}>
                  <FormGroup className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="email"
                      name="emailId"
                      placeholder="Enter your email"
                      value={logIn.emailId}
                      onChange={onHandling}
                      isInvalid={!!error.emailId}
                    />
                    <FormText className="text-danger">{error.emailId}</FormText>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={logIn.password}
                      onChange={onHandling}
                      isInvalid={!!error.password}
                    />
                    <FormText className="text-danger">{error.password}</FormText>
                  </FormGroup>

                  <FormGroup className="mb-3 d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <a href="#" style={{ fontSize: "0.9rem" }}>
                      Forgot Password?
                    </a>
                  </FormGroup>

                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
