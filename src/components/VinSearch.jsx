import React, { useState } from 'react'
import Axios from 'axios'
import { Form, Input, Label, FormGroup, Button, Card, CardBody, Col } from 'reactstrap'
import Bar from './Navbar'

export default function VinSearch() {
    const [data, setData] = useState(null)
    const [value, setValue] = useState("")

    const handleSubmit = async () => {
        try {
            const res = await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${value}?format=json`)
            let obj = res.data.Results[0]
            let newObj = {};
            Object.keys(obj).forEach((prop) => {
                if (obj[prop]) { newObj[prop] = obj[prop]; }
            });
            let newArr = Object.entries(newObj)
            setData(newArr)
        }
        catch {

        }
    }


    return (
        <>
            <Bar />
            <Col sm="12" md={{ size: 8, offset: 2 }} style={{ fontFamily: "Prompt" }}>
                <br />
                <Card style={{ backgroundColor: "rgba(20, 20, 20, .75)" }}>
                    <CardBody>
                        <h2>Enter VIN</h2>
                        <Form inline>
                            <FormGroup>
                                <Label for="vin" hidden>VIN</Label>
                                <Input type="text" name="vin" id="vin" placeholder="VIN" value={value} onChange={(e) => setValue(e.target.value)} />
                            </FormGroup>
                            <Button onClick={() => handleSubmit()}>Get Info</Button>
                        </Form>
                        <br />
                        {/* <CardText tag='h2'>{this.state.stuff.vehicle}</CardText>
                        <CardText tag='h2'>Mileage: {this.state.stuff.mileage}</CardText>
                        <CardText tag='h2'>Average value: ${this.state.stuff.mean}</CardText> */}
                        {data ?
                            data.map((datum) => (
                                <div key={datum.id}>
                                    <h3>{datum[0]}{': '}{datum[1]}</h3>
                                </div>
                            )) :
                            null
                        }
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}
