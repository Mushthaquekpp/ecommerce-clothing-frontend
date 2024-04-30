import React, { useState, useEffect } from "react";
import { Container, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../Context/Auth";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import SearchInput from "../Form/SearchInput";
const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("token");
  };
  return (
    <Navbar expand="lg" className="navbar">
      <Container className="nav-container container-fluid">
        <Navbar.Brand href="/" className="navbar-brand">
          ECOMMERCE APP
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" ms-auto">
            <SearchInput />
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="#">CATEGORIES</Nav.Link>

            {!auth.user ? (
              <>
                <Nav.Link href="/register">REGISTER</Nav.Link>
                <Nav.Link href="/login">LOGIN</Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown title={auth.user?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={handleLogout} to="/login">
                  LOGOUT
                </Nav.Link>
              </>
            )}

            <Nav.Link href="/cart">CART(0)</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
