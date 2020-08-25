import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import '../App.css';

export default function HomePage() {
    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className="App-logo"
                    alt="logo"
                />
                <h1>Welcome to RevHeads</h1>
                <div className="buttonDiv">
                    <Link to="/login"><Button>LOGIN</Button></Link>
                    <br/>
                    <Link to="/register"><Button>SIGN UP</Button></Link>
                </div>
            </header>
        </div>
    )
}
