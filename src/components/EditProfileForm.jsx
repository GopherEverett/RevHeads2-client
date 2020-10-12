import React, { useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { withCookies, useCookies } from 'react-cookie'
import Axios from 'axios'
import LoaderButton from './LoaderButton'

function EditProfileForm(props) {
    const [cookies, setCookie] = useCookies('')
    const [username, setUsername] = useState(cookies.username)
    const [name, setName] = useState(cookies.name)
    const [location, setLocation] = useState(cookies.location)
    const [photo, setPhoto] = useState(cookies.photo_url)
    const [isLoading, setIsLoading] = useState(false)

    const submitEditedUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await Axios.put(`https://revheads-backend.herokuapp.com/user/builder/${cookies.userid}`, {
                username: username,
                name: name,
                photo_url: photo,
                location: location
            }, { withCredentials: true })
            setCookie('username', res.data.data.username, { path: '/' })
            setCookie('name', res.data.data.name, { path: '/' })
            setCookie('location', res.data.data.location, { path: '/' })
            setCookie('photo_url', res.data.data.photo_url, { path: '/' })
            setTimeout(() => props.setShowform(false), 2000)
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <Form inline onSubmit={submitEditedUser} className="submitForm" style={{ fontFamily: "Prompt" }}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup>
                <Label for="photo_url" hidden>Email</Label>
                <Input
                    type="photo_url"
                    name="photo_url" id="photo_url"
                    placeholder="Photo URL"
                    value={photo}
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </FormGroup>
            <br />
            <LoaderButton isLoading={isLoading}>Submit</LoaderButton>
        </Form>
    )
}
export default withCookies(EditProfileForm)
