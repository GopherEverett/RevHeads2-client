import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormControl, Button } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert'
import Bar from './Navbar';
import LoaderButton from './LoaderButton'
import { withCookies, useCookies } from 'react-cookie'
import Axios from 'axios'

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [toProfile, setToProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies('username')
    const [message, setMessage] = useState(null)
    const [alert, setAlert] = useState(false)

    const onConfirm = () => {
        setAlert(false)
    }

    const submitUser = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setAlert(true)
        }
        else {
            setIsLoading(true)
            try {
                const res = await Axios.post(`https://revheads-backend.herokuapp.com/user/login`, {
                    username: username,
                    email: email,
                    password: password
                }, { withCredentials: true })
                if (res.data.status.code === 401) {
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setMessage(res.data.status.message)
                    setIsLoading(false)
                }
                else {
                    setCookie('username', res.data.data.username, { path: '/' })
                    setCookie('userid', res.data.data.id, { path: '/' })
                    setCookie('name', res.data.data.name, { path: '/' })
                    setCookie('location', res.data.data.location, { path: '/' })
                    setCookie('created_at', res.data.data.created_at, { path: '/' })
                    setCookie('photo_url', res.data.data.photo_url, { path: '/' })
                    setTimeout(() => setToProfile(true), 2000)
                }
            }
            catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }
    }

    return (
        <>
            <Bar />
            <div className="builderProf">
                {toProfile && <Redirect to={'/profile'} />}
                <h2 className="formTitle">LOGIN</h2>
                {message && (
                    <div className='loginErrorDiv'>
                        <h3 className="loginError">{message}</h3>
                        <h3 className="loginError">try again or sign up</h3>
                    </div>
                )
                }
                {alert && <SweetAlert
                    title={"Passwords do not match"}
                    onConfirm={onConfirm}
                />
                    }
                <Form inline onSubmit={submitUser} className="submitForm" style={{ fontFamily: "Prompt" }}>
                    <FormGroup>
                        <Label for="username" hidden>Name</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            autoComplete='username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="email" hidden>Email</Label>
                        <Input
                            type="email"
                            name="email" id="email"
                            placeholder="Email"
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="password" hidden>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="confirmPassword" hidden>Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder=" Confirm Password"
                            value={confirmPassword}
                            autoComplete="current-password"
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <br />
                    <>
                        <LoaderButton isLoading={isLoading}>Submit</LoaderButton>
                        <br />
                        {message &&
                            <Link to='/register'><Button>SIGN UP</Button></Link>
                        }
                    </>
                </Form>
            </div>
        </>
    )
}
