import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: center;
gap:10px;
`

function Home({ type }) {

  const [videos, setVideos] = useState([])

  useEffect(() => {

    const fetchVideos = async () => {
      const resp = await axios.get(`/videos/${type}`)
      const res = await resp.data
      console.log(res)
      setVideos(res)

    }
    fetchVideos()
  }, [type])

  return (
    <Container>
      {videos.length > 0 ?
        videos.map((item) => (<Card key={item._id} video={item} />))
        : (<div>Loading...</div>)}
    </Container>
  )
}

export default Home