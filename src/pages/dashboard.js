import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Dashboard({ user, logout }) {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text>Welcome, {user.name}</Navbar.Text>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main content */}
      <Container className="mt-5">
        <div >
          <h3 className="text-center">Your Dashboard</h3>
          {/* Add more dashboard content here */}
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
