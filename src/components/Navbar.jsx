
import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import logo from '../images/favicon-32x32.png'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { withCookies, useCookies } from 'react-cookie'
import Axios from 'axios'
import NavDropdown from './NavDropdown'

function Bar(props) {
    let history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies(['username'])
    const [redir, setRedir] = useState(false)

    const logOutUser = async (e) => {
        e.preventDefault()
        try {
            await Axios.get('http://localhost:8000/user/logout', { withCredentials: true })
            removeCookie('username', { path: '/' })
            removeCookie('userid', { path: '/' })
            removeCookie('name', { path: '/' })
            removeCookie('location', { path: '/' })
            removeCookie('created_at', { path: '/' })
            removeCookie('photo_url', { path: '/' })
            setRedir(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {redir ?
                <Redirect to="/" /> :
                <Navbar color='light' light sticky={'top'} style={{ fontFamily: "Prompt" }}>
                    <NavbarBrand href="/" className="mr-auto">
                        <img src={logo} alt='' />
                    </NavbarBrand><Button outline color="secondary" className="mr-2" onClick={() => history.goBack()}>⬅︎ Back</Button>
                    {cookies['username'] ?
                        <Button onClick={logOutUser} outline color="danger" className="logout">Logout</Button> :
                        <Link to='/login'><Button className="login">Login</Button></Link>
                    }
                    <NavDropdown {...props}/>
                </Navbar>
            }
        </>
    );
}

export default withCookies(Bar)