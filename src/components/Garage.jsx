import React, { useState, useEffect } from 'react'
import { withCookies, useCookies } from 'react-cookie'
import { Button, Card, CardImg, CardBody, CardImgOverlay, CardGroup } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import Bar from './Navbar'
import Axios from 'axios'
import AddCarForm from './AddCarForm'

function Garage(props) {
    const [cookies] = useCookies(['username'])
    const [cars, setCars] = useState([])
    const [addform, setAddform] = useState(false)

    const toggleForm = () => {
        setAddform(!addform)
    }

    const fetchCars = async () => {
        const res = await Axios.get(`https://revheads-backend.herokuapp.com/api/v1/cars/carsbybuilder/${cookies.userid}`, { withCredentials: true })
        setCars(res.data.data)
    }

    // useEffect(() => {
    //     async function fetchCars() {
    //         const res = await Axios.get(`http://localhost:8000/api/v1/cars/carsbybuilder/${cookies.userid}`, { withCredentials: true })
    //         setCars(res.data.data)
    //     }
    //     fetchCars()
    // }, [])

    useEffect(() => {
        fetchCars()
    }, [])


    return (
        <>
            <Bar />
            <div className='builderProf'>
                <h2>{props.allCookies.username}'s Garage</h2>
                {cars.length ?
                    <Card className="carCard" width="45%" >
                        <CardBody>
                            <>
                                <CardImg src={cars[0].builder.photo_url} alt="" />
                                <CardImgOverlay className='overlay'>
                                    <h2>{cars[0].builder.name}</h2>
                                    <h2>{cars[0].builder.location}</h2>
                                </CardImgOverlay>
                            </>

                            {/* <Button className="float-right" color="danger" onClick={this.handleDelete}>{`Delete ${cars[0].builder.name}`}</Button> */}
                        </CardBody>
                    </Card >
                    :
                    // <Card className="emptyCar" width="45%" >
                    <h2>NO CARS</h2>
                    // </Card>
                }
                {cars.length ?
                    <h2>Cars:</h2> :
                    null
                }
                <div className="carDiv">
                    {cars.map(car => (
                        <Card key={car.id} className="singleCar">
                            <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                <CardImg width="100%" className="carimg" src={car.photo_url} alt="" />
                                <CardImgOverlay>
                                    <h2 className='carname'>{car.name}</h2>
                                </CardImgOverlay>
                            </Link>
                        </Card>
                    ))}
                </div>
                {addform ?
                    <AddCarForm fetchCars={fetchCars} builder={props.cookies.cookies.userid} toggle={toggleForm} />
                    :
                    <Button className='addCarButton' color="success" onClick={() => toggleForm()}>+ Car</Button>}
            </div>
        </>
    )
}

export default withCookies(Garage)
