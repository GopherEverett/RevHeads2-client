import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, Redirect, useParams } from 'react-router-dom'
import Bar from './Navbar'
import { Button, Card, CardImg, CardText, CardTitle, CardBody, Col } from 'reactstrap'
// import AddProjectForm from './AddProjectForm'

export default function Car() {
    const [car, setCar] = useState(null)
    const [updatedCar, setUpdatedcar] = useState(null)
    const [projects, setProjects] = useState(null)
    const [redir, setRedir] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        fetchProjects()
        fetchCar()
    }, [])

    useEffect(() => {
        updateVote()
    }, [updatedCar])


    async function fetchProjects() {
        const res = await Axios.get(`http://localhost:8000/api/v1/projects/projectsbycar/${id}`, { withCredentials: true })
        setProjects(res.data.data)
    }

    async function fetchCar() {
        const res = await Axios.get(`http://localhost:8000/api/v1/cars/${id}`, { withCredentials: true })
        setCar(res.data.data)
    }

    const handleVoteChangeUp = (evt) => {
        evt.preventDefault()
        let copyCar = { ...car }
        copyCar.votes += 1
        setUpdatedcar(copyCar)
    }

    const handleVoteChangeDown = (evt) => {
        evt.preventDefault()
        let copyCar = { ...car }
        copyCar.votes -= 1
        setUpdatedcar(copyCar)
    }

    const updateVote = async () => {
        console.log(car)
        try {
            await Axios.put(`http://localhost:8000/api/v1/cars/${id}`, {
                builder: updatedCar.builder.id,
                make: updatedCar.make,
                name: updatedCar.name,
                photo_url: updatedCar.photo_url,
                votes: updatedCar.votes,
                id: updatedCar.id,
                year: updatedCar.year
            }, { withCredentials: true })
            fetchCar()
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`http://localhost:8000/api/v1/cars/${id}`, { withCredentials: true })
            setRedir(true)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    // toggleAddForm = () => {
    //     this.setState((state) => {
    //         return ({ isAddFormDisp: !state.isAddFormDisp })
    //     })
    // }

    return (
        <>
            {redir ? <Redirect to='/mygarage' /> :
                null}
            <Bar />
            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ fontFamily: "Prompt" }}>
                <br />
                <Card style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                    <CardBody>
                        {car ?
                            <>
                                <CardImg top width="50%" src={car.photo_url} alt="" />
                                <CardTitle tag="h2">Name: {car.name}</CardTitle>
                                <CardText tag="h3">Make: {car.make}</CardText>
                                <CardText tag="h3">Model: {car.model}</CardText>
                                <CardText tag="h3">Year: {car.year}</CardText>
                                <CardText tag="h3">Votes: {car.votes}</CardText>
                            </>
                            :
                            null
                        }
                        <Button className='upVote' onClick={(e) => handleVoteChangeUp(e)}><span role='img' aria-label="thumbs-up">👍🏻</span></Button>
                        <Button className='downVote' onClick={(e) => handleVoteChangeDown(e)}><span role='img' aria-label="thumbs-down">👎🏻</span></Button>
                        <h2>Projects: </h2>
                        {projects ?
                            projects.map(project => (
                                <div key={project.id}>
                                    <Link to={`/projects/${project.id}/`} style={{ textDecoration: 'none', color: 'blue' }}><h4>{project.title}</h4></Link>
                                </div>
                            ))
                            :
                            null
                        }

                        <br />
                        <div>
                            {/* {this.state.isAddFormDisp ?
                                <AddProjectForm toggleAddForm={this.toggleAddForm} carId={this.state.car.id} fetch={this.fetchCar} /> :
                                <Button color="success" onClick={this.toggleAddForm}>+ Project</Button>} */}
                            {car ?
                                <Button className="float-right" color="danger" onClick={() => handleDelete()}>{`Delete ${car.name}`}</Button> :
                                null
                            }
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}
