import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios'
import LoaderButton from './LoaderButton'


export default function AddCarForm(props) {
const [name, setName] = useState('')
const [make, setMake] = useState('')
const [model, setModel] = useState('')
const [year, setYear] = useState('')
const [photo, setPhoto] = useState('')
const [isLoading, setIsLoading] = useState(false)

const submitCar = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        const res = await Axios.post(`https://revheads-backend.herokuapp.com/api/v1/cars/`, {
            make: make,
            model: model,
            year: year,
            name: name,
            photo_url: photo,
            builder: props.builder
        }, { withCredentials: true })
        console.log(res)
        setIsLoading(false)
        props.toggle()
        props.fetchCars()
    }
    catch (err) {
        console.log(err)
        setIsLoading(false)
    }
}

    return (
        // <div style={{ fontFamily: "Prompt" }}>
        <Form inline onSubmit={submitCar}>
            <FormGroup>
                <Label for="name" hidden>Name</Label>
                <Input type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="make" hidden>Make</Label>
                <Input type="text" name="make" id="make" placeholder="Make" onChange={(e) => setMake(e.target.value)} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="model" hidden>Model</Label>
                <Input type="text" name="model" id="model" placeholder="Model" onChange={(e) => setModel(e.target.value)} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="year" hidden>Year</Label>
                <Input type="text" name="year" id="year" placeholder="Year" onChange={(e) => setYear(e.target.value)} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="photo_url" hidden>Photo URL</Label>
                <Input type="text" name="photo_url" id="photo_url" placeholder="Photo URL" onChange={(e) => setPhoto(e.target.value)} />
            </FormGroup>
            {' '}
            <LoaderButton isLoading={isLoading}>Submit</LoaderButton>
        </Form>
    // </div>
    )
}
