
import React from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import logo from '../images/favicon-32x32.png'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'

export default function Bar() {
    return (
        <Navbar color='light' light style={{ fontFamily: "Prompt" }}>
            <NavbarBrand href="/" className="mr-auto">
                <img src={logo} alt='' />
            </NavbarBrand>
            <Link to={'../'}><Button outline color="secondary" className="mr-2">⬅︎ Back</Button></Link>
            <NavDropdown />
        </Navbar>
    );
}