import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Avatar from './Avatar'
import { format } from 'timeago.js'
import axios from 'axios'

const Container = styled.div`
width: ${(props) => props.type !== 'sm' ? '22vw' : '100%'};
margin-bottom: ${(props) => props.type === 'sm' ? '10px' : '45px'};
cursor:pointer;
display: ${(props) => props.type === 'sm' && 'flex'};
`
const Image = styled.img`
width:100%;
height: ${(props) => props.type === 'sm' ? '90px' : '169px'};
background: #999;
margin-right: ${(props) => props.type === 'sm' && '10px'};
flex: 1;
`
const Details = styled.div`
display:flex;
margin-top: ${(props) => props.type !== 'sm' && '5px'};
gap:12px;
flex: 1;
`
const Texts = styled.div`

`
const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`
const ChannelName = styled.h2`
font-size:14px;
color:${({ theme }) => theme.textSoft};
margin:6px 0; 
`
const Info = styled.div`
font-size: 12px;
color:${({ theme }) => theme.textSoft};
`

const Card = ({ type, video }) => {

  const [channel, setChannel] = useState({})

  useEffect(() => {

    const fetchChannel = async () => {
      try {
        const resp = await axios.get(`/users/${video.userId}`)
      const res = await resp.data
      setChannel(res)
      } catch(err) {
        // console.log(err)
      }
    }
    fetchChannel()
  }, [video.userId])

  return (
    <div>
      <Container type={type}>
        {Object.keys(channel).length > 0 ?
          (<Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
            <Image src={video.imgUrl} type={type} />
            <Details type={type}>
              {type !== 'sm' && <Avatar src={channel.img} />}
              <Texts>
                <Title>{video.title}</Title>
                <ChannelName>{channel.name}</ChannelName>
                <Info>{video.views || 0} view{video.views !== 1 && 's'} {format(video.createdAt)}</Info>
              </Texts>
            </Details>
          </Link>)
          : (
            <>
              <Image src={null} type={type} />
              <div>Loading...</div>
            </>)}
      </Container>
    </div>
  )

}

export default Card