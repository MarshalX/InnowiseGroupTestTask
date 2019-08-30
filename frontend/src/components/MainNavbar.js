import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Me from "../containers/GetMe";


class MainNavbar extends React.Component {
    render() {
        const me = this.props.me;

        return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
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
                    {me !== null && !me.is_staff ? null : (
                        <LinkContainer to="/users">
                            <Nav.Link>Список пользователей</Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>
                <Nav>
                    <Me/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    };
}

export default MainNavbar
