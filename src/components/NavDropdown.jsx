import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

export default function NavDropdown() {
    const [dropdownOpen, setDropdownopen] = useState(false)
    const toggle = () => {
        setDropdownopen(!dropdownOpen)
    }

        return (
            <Dropdown isOpen={dropdownOpen} toggle={() => toggle()}>
                <DropdownToggle outline color="secondary" caret>
                Menu
            </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>Go To:</DropdownItem>
                    <DropdownItem><Link to="/builders" style={{ textDecoration: 'none', color: 'blue' }}>Builders</Link></DropdownItem>
                    <DropdownItem><Link to="/cars" style={{ textDecoration: 'none', color: 'blue' }}>Cars</Link></DropdownItem>
                    <DropdownItem><Link to="/vinlookup" style={{ textDecoration: 'none', color: 'blue' }}>Get Car Info by VIN</Link></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
}
