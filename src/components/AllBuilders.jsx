import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Bar from './Navbar'
import Moment from 'react-moment'
// import AddBuilderForm from './AddBuilderForm'
import { Card, CardBody, CardImg, CardText, CardImgOverlay } from 'reactstrap'

export default function AllBuilders() {
    const [builders, setBuilders] = useState(null)
    useEffect(() => {
        async function fetchBuilders() {
            const res = await Axios.get(`http://localhost:8000/user/`)
            setBuilders(res.data.data)
            console.log(builders)
        }
        fetchBuilders()
    }, [])
    return (
        <>
            <Bar />
            {builders ?
                <div className='builderProf'>
                    {builders.map((user, i) => (
                        <div key={i}>
                            <Card className="userCard"  >
                                <CardBody>
                                    <CardImg top width="50%" src={user.photo_url} alt="" />
                                    <CardImgOverlay className='overlay'>
                                        <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'blue' }}><h2>{user.username}</h2></Link>
                                        <CardText tag="h4">Full Name: {user.name}</CardText>
                                        <CardText tag="h4">Location: {user.location}</CardText>
                                        <CardText tag="h4">Member Since: <Moment fromNow>{user.created_at}</Moment></CardText>
                                    </CardImgOverlay>
                                </CardBody>
                            </Card>
                            <br />
                        </div>
                    )
                    )}
                </div> :
                null
            }
        </>
    )
}
