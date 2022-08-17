import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
flex: 2;
`

function Recommendation({ tags }) {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`/videos/tags?tags=${tags}`)
                setVideos(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    }, [tags])

    return (
        <Container>
            {videos.map((video) => <Card key={video._id} video={video} type="sm" />)}
        </Container>

    )
}

export default Recommendation