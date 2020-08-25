import React, { useState, useEffect } from 'react'
import { withCookies, useCookies } from 'react-cookie'
import { Button, Card, CardImg, CardBody } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import Bar from './Navbar'
import Axios from 'axios'

function Garage(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['username'])
    const [cars, setCars] = useState([])
    const [user, setUSer] = useState(null)
    useEffect(() => {
        async function fetchCars() {
            const res = await Axios.get(`http://localhost:8000/api/v1/cars/carsbybuilder/${cookies.userid}`, { withCredentials: true })
            setCars(res.data.data)
            console.log(cars)
        }
        fetchCars()
    }, [])


    return (
        <>
            <Bar />
            <div className='builderProf'>
                <h2>{props.allCookies.username}'s Garage</h2>
                <Card className="carCard" width="45%" style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                    <CardBody>
                        {cars.length ?
                            <>
                                <CardImg src={cars[0].builder.photo_url} alt="" />
                                <h1>{cars[0].builder.name}</h1>
                                <h2>{cars[0].builder.location}</h2>
                                <h3>Cars:</h3>
                            </>
                            :
                            null
                        }
                        {cars.map(car => (
                            <div key={car.id}>
                                <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'blue' }}><h4>{car.name}</h4>
                                    <img className="carimg" src={car.photo_url} alt="" />
                                </Link>
                            </div>
                        ))}
                        {/* {this.state.isAddFormDisp ?
                    <AddCarForm builderId={this.state.builder.id} toggleAddForm={this.toggleAddForm} fetch={this.fetchBuilder} />
                    :
                    <Button color="success" onClick={this.toggleAddForm}>+ Car</Button>} */}
                        {/* <Button className="float-right" color="danger" onClick={this.handleDelete}>{`Delete ${cars[0].builder.name}`}</Button> */}
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default withCookies(Garage)
