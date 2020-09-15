import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Bar from './Navbar'
import { Card, CardBody, CardImg, CardText, CardImgOverlay } from 'reactstrap'

export default function AllCars() {
    const [cars, setCars] = useState(null)

    useEffect(() => {
        async function fetchBuilders() {
            const res = await Axios.get(`https://revheads-backend.herokuapp.com/api/v1/cars/`)
            setCars(res.data.data)
            console.log(cars)
        }
        fetchBuilders()
    }, [])
    return (
        <>
            <Bar />
            {cars ?
                <div className='builderProf'>
                    {cars.map((car, i) => (
                        <div key={i}>
                            <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                <Card className="userCard"  >
                                    <CardBody>
                                        <CardImg top width="50%" src={car.photo_url} alt="" />
                                        <CardImgOverlay className='overlay'>
                                            <h2>{car.name}</h2>
                                            <CardText tag="h4">Make: {car.make}</CardText>
                                            <CardText tag="h4">Model: {car.model}</CardText>
                                            <CardText tag='h4'>Builder: {car.builder.name}</CardText>
                                            {/* <CardText tag="h4">Member Since: <Moment fromNow>{car.created_at}</Moment></CardText> */}
                                        </CardImgOverlay>
                                    </CardBody>
                                </Card>
                                <br />
                            </Link>
                        </div>
                    )
                    )}
                </div>
                :
                null
            }
        </>
    )
}
