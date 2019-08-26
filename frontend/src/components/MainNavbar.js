import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'


const MainNavbar = () =>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
        <Navbar.Brand href="#">Test task</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to="/">
                    <Nav.Link>Главная</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/books">
                    <Nav.Link>Список книг</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
;

export default MainNavbar
