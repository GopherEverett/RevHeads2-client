import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import LoaderButton from './LoaderButton'
import Bar from './Navbar'
import { withCookies, useCookies } from 'react-cookie'
import Axios from 'axios'

function Register(props) {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [photo, setPhoto] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toCars, setToCars] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cookies, setCookie ] = useCookies('username')

    const submitUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await Axios.post(`http://localhost:8000/user/register`, {
                username: username,
                email: email,
                password: password,
                name: name,
                photo_url: photo,
                location: location
            }, { withCredentials: true })
            setCookie('username', res.data.data.username, { path: '/' })
            setCookie('userid', res.data.data.id, { path: '/' })
            setCookie('name', res.data.data.name, { path: '/' })
            setCookie('location', res.data.data.location, { path: '/' })
            setCookie('created_at', res.data.data.created_at, { path: '/' })
            setCookie('photo_url', res.data.data.photo_url, { path: '/' })
            setTimeout(() => setToCars(true), 2000)
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Bar />
            <div className="builderProf">
                {toCars ? <Redirect to={'/mygarage'} /> : null}
                <h2 className="formTitle">SIGN UP</h2>
                <Form inline onSubmit={submitUser} className="submitForm" style={{ fontFamily: "Prompt" }}>
                    <FormGroup>
                        <Label for="username" hidden>Name</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="name" hidden>Full Name</Label>
                        <Input
                            type="name"
                            name="name" id="name"
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="email" hidden>Email</Label>
                        <Input
                            type="email"
                            name="email" id="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="photo_url" hidden>Email</Label>
                        <Input
                            type="photo_url"
                            name="photo_url" id="photo_url"
                            placeholder="Photo URL"
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="location" hidden>Email</Label>
                        <Input
                            type="location"
                            name="location" id="location"
                            placeholder="Location"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="password" hidden>Photo URL</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <br />
                    <LoaderButton isLoading={isLoading}>Submit</LoaderButton>
                </Form>
            </div>
        </>
    )
}
export default withCookies(Register)