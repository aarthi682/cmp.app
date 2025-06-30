import { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  FormText,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { CmpService } from "../../service/CmpService";

const UserRegister = () => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    Address: "",
    state: "",
    city: "",
    pincode: "",
    roleId: 2,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!register.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!/^[A-Za-z]+$/.test(register.firstName)) newErrors.firstName = "Only alphabets allowed";

    if (!register.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!register.emailId.trim()) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(register.emailId)) newErrors.emailId = "Invalid email format";

    if (!register.password) newErrors.password = "Password is required";
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/.test(register.password)) {
      newErrors.password = "Must be 6+ chars with 1 letter, 1 number, and 1 special char";
    }

    if (!register.Address.trim()) newErrors.Address = "Address is required";
    if (!register.city.trim()) newErrors.city = "City is required";
    else if (!/^[A-Za-z]+$/.test(register.city)) newErrors.city = "Only alphabets allowed";

 const stateValue = register.state.trim();
if (!stateValue) {
  newErrors.state = "State is required";
}  else if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(stateValue)) {
  newErrors.state = "Only alphabets and single spaces between words allowed";
}



    if (!register.contact) newErrors.contact = "Contact is required";
    else if (!/^\d{10}$/.test(register.contact)) newErrors.contact = "Must be 10 digits";

    if (!register.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(register.pincode)) newErrors.pincode = "Must be 6 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await CmpService.registorCreate(register);
      if (response.data.status === "successfully") {
        alert("User registered successfully!");
        setRegister({
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          contact: "",
          Address: "",
          state: "",
          city: "",
          pincode: "",
          roleId: 2,
        });
        setErrors({});
      } else if (response.data.Status === "fail") {
        alert("Email ID already exists.");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "2rem" }}>
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img
              src="https://img.freepik.com/premium-vector/hands-fill-registration-data_18660-3897.jpg?uid=R202929956&ga=GA1.1.1609496208.1746360686&semt=ais_hybrid&w=740"
              alt="Register"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Card
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(190, 50, 157, 0.3)",
                maxHeight: "800px",
                overflowY: "auto",
              }}
            >
              <h3 className="text-center mb-4" style={{ color: "rgba(190, 50, 157, 0.8)" }}>
                User Registration
              </h3>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup className="mb-3">
                      <FormLabel>First Name</FormLabel>
                      <FormControl
                        type="text"
                        name="firstName"
                        value={register.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        isInvalid={!!errors.firstName}
                      />
                      <FormText className="text-danger">{errors.firstName}</FormText>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="mb-3">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl
                        type="text"
                        name="lastName"
                        value={register.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        isInvalid={!!errors.lastName}
                      />
                      <FormText className="text-danger">{errors.lastName}</FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup className="mb-3">
                      <FormLabel>Email</FormLabel>
                      <FormControl
                        type="email"
                        name="emailId"
                        value={register.emailId}
                        onChange={handleChange}
                        placeholder="Enter email"
                        isInvalid={!!errors.emailId}
                      />
                      <FormText className="text-danger">{errors.emailId}</FormText>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="mb-3">
                      <FormLabel>Password</FormLabel>
                      <FormControl
                        type="password"
                        name="password"
                        value={register.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        isInvalid={!!errors.password}
                      />
                      <FormText className="text-danger">{errors.password}</FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-3">
                  <FormLabel>Contact</FormLabel>
                  <FormControl
                    type="text"
                    name="contact"
                    value={register.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    isInvalid={!!errors.contact}
                  />
                  <FormText className="text-danger">{errors.contact}</FormText>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>Address</FormLabel>
                  <FormControl
                    as="textarea"
                    rows={2}
                    name="Address"
                    value={register.Address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    isInvalid={!!errors.Address}
                  />
                  <FormText className="text-danger">{errors.Address}</FormText>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>State</FormLabel>
                  <FormControl
                    type="text"
                    name="state"
                    value={register.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    isInvalid={!!errors.state}
                  />
                  <FormText className="text-danger">{errors.state}</FormText>
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup className="mb-3">
                      <FormLabel>City</FormLabel>
                      <FormControl
                        type="text"
                        name="city"
                        value={register.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        isInvalid={!!errors.city}
                      />
                      <FormText className="text-danger">{errors.city}</FormText>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="mb-4">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl
                        type="text"
                        name="pincode"
                        value={register.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode"
                        isInvalid={!!errors.pincode}
                      />
                      <FormText className="text-danger">{errors.pincode}</FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center mt-3">
                  <Button type="submit" className="px-4">
                    Register
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserRegister;
