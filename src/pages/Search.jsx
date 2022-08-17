import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
display: flex;
gap: 10px;
flex-wrap: wrap;
`

function Search() {
    const query = useLocation().search
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetch = async () => {

            try {
                const res = await axios.get(`/videos/search${query}`)
                setVideos(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetch()

    }, [query])

    return (
        <Container>
            {videos.map(video => <Card key={video._id} type="sm" video={video} />)}
        </Container>
    )
}

export default Search