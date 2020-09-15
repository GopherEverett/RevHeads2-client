import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Cookies, setCookie, useCookies } from 'react-cookie';

export default function NavDropdown(props) {
    const [dropdownOpen, setDropdownopen] = useState(false)
    const [cookies] = useCookies(['username'])
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
                {cookies['username'] ?
                <>
                    <DropdownItem><Link to="/mygarage" style={{ textDecoration: 'none', color: 'blue' }}>{props.cookies.cookies.username}'s Garage</Link></DropdownItem>
                    <DropdownItem><Link to="/profile" style={{ textDecoration: 'none', color: 'blue' }}>{props.cookies.cookies.username}'s Profile</Link></DropdownItem>
                    </> :
                    null
                }
                <DropdownItem><Link to="/vinlookup" style={{ textDecoration: 'none', color: 'blue' }}>Get Car Info by VIN</Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
