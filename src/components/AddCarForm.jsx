import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function AddCarForm() {
const
const
const
const
const
const

    return (
        <div style={{ fontFamily: "Prompt" }}>
        <Form inline onSubmit={this.createCar}>
            <FormGroup>
                <Label for="name" hidden>Name</Label>
                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="make" hidden>Make</Label>
                <Input type="text" name="make" id="make" placeholder="Make" onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="model" hidden>Model</Label>
                <Input type="text" name="model" id="model" placeholder="Model" onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="year" hidden>Year</Label>
                <Input type="text" name="year" id="year" placeholder="Year" onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label for="photo_url" hidden>Photo URL</Label>
                <Input type="text" name="photo_url" id="photo_url" placeholder="Photo URL" onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <Button>Submit</Button>
        </Form>
    </div>
    )
}
