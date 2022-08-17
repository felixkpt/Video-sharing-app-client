import { Avatar } from '@mui/material'
import axios from 'axios'
import { format } from 'timeago.js'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
gap: 10px;
margin: 30px 0;
`
const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({ theme }) => theme.text};
`

const Name = styled.span`
font-size: 13px;
font-weight: 500;
`

const Date = styled.span`
font-size: 12px;
font-weight: 400;
margin-left: 5px;
color: ${({ theme }) => theme.soft};
`
const Text = styled.span`
font-size: 14px;
`

function Comment({ comment }) {
    
    const [channel, setChannel] = useState({})

    useEffect(() => {
      const fetchData = async () => {
        try {
          const channelRes = await axios.get(`/users/${comment.userId}`)
  
          setChannel(channelRes.data)
        } catch (err) {
          console.log(err)
        }
      }
  
      fetchData()
  
    }, [comment._id])

    
    return (
        <Container>
            <Avatar src={channel.img} />
            <Details>
                <Name>{channel.name} <Date>{format(comment.createdAt)}</Date></Name>
                <Text>{comment.desc}</Text>
            </Details>

        </Container>
    )
}

export default Comment