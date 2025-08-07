import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './LogoutButton'; // Make sure you have this component

function NavigationBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {!user && (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}

            {user && (
              <>
                <Nav.Link as={Link} to="/products">Product Listing</Nav.Link>
                <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link> 
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                <LogoutButton />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
