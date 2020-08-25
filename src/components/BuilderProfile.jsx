import React, { useState } from 'react'
import { Button, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import { withCookies, useCookies } from 'react-cookie'
import Bar from './Navbar'
import Moment from 'react-moment'
import Axios from 'axios'

function BuilderProfile() {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies('username')
    return (
        <>
            <Bar />
            <div className='builderProf'>
            <h2>{cookies.username}'s Profile</h2>
                <Card className="carCard" width="45%" style={{ backgroundColor: "rgba(242, 244, 247, .7)" }}>
                    <CardBody>
                        <CardImg top width="50%" src={cookies.photo_url} alt="" />
                        <CardTitle tag="h2">Username: {cookies.username}</CardTitle>
                        <CardText tag="h3">Full Name: {cookies.name}</CardText>
                        <CardText tag="h3">Location: {cookies.location}</CardText>
                        <CardText tag="h3">Member Since: <Moment fromNow>{cookies.created_at}</Moment></CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default withCookies(BuilderProfile)