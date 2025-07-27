import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

const AdminFrom = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!username || !email || !password) {
     setErrorMessage("All fields are required");
     return;
   }

   try {
     console.log("Sending data to backend:", { username, email, password }); // Add logging here

   const response = await axios.post(
     "http://localhost:5000/api/admin/add-admin",
     {
       username,
       email,
       password,
     }
   );



     setSuccessMessage(response.data.message);
     setUsername("");
     setEmail("");
     setPassword("");
     setErrorMessage("");
   } catch (error) {
     setErrorMessage(error.response?.data?.message || "Error adding admin");
   }
 };


  return (
    <Container className="my-4">
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Add New Admin</CardTitle>

          {/* Show Success or Error Message */}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          {successMessage && <Alert color="success">{successMessage}</Alert>}

          {/* Admin Form */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </FormGroup>

            <Button type="submit" color="primary">
              Add Admin
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminFrom;
