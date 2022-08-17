import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchStart, fetchSuccess, fetchFailure, like, dislike } from '../redux/videoSlice'
import { subscription } from '../redux/userSlice'
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlined from "@mui/icons-material/ThumbDownOffAltOutlined"
import ReplyOutlined from "@mui/icons-material/ReplyOutlined"
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddTaskOutlined from "@mui/icons-material/AddTaskOutlined"
import Comments from '../components/Comments'
import Avatar from '../components/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from 'axios'
import Recommendation from '../components/Recommendation'

const Container = styled.div`
display: flex;
gap: 19px;
`
const Content = styled.div`
flex: 5;
`
const VideoWrapper = styled.div`

`
const VideoFrame = styled.video`
max-height: 720px;
width:100% ;
object-fit: cover;

`

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`

const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
`
const Hr = styled.hr`
margin:5px 0;
border: 0.5px solid ${({ theme }) => theme.soft};
`
const Channel = styled.div`
display:flex;
justify-content:space-between;`

const ChannelInfo = styled.div`
display:flex;
gap: 13px;
`
const AvatarWrapper = styled.div`
flex-basis: 55px!important;
`

const ChannelDetail = styled.div`
display:flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span``
const ChannelDescription = styled.span`
font-size: 14px;
`
const ChannelCounter = styled.span`
font-size:12px;
margin-top: 5px;
margin-bottom: 10px;
`
const Subscribe = styled.button`
text-transform: capitalize;
font-weight:500;
background-color: #cc1a00;
color: white;
border:none;
border-radius: 3px;
height: max-content;
cursor: pointer;
padding: 10px 20px;
`

function Video() {
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const dispatch = useDispatch()

  const path = useLocation()
  const videoId = path.pathname.split('/')[2]

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/${videoId}`)
        const channelRes = await axios.get(`/users/${videoRes.data.userId}`)

        dispatch(fetchSuccess(videoRes.data))
        setChannel(channelRes.data)
        // console.log(currentVideo)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

  }, [videoId, dispatch])

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

  const handleDisLike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSubscription = async () => {

    if (currentUser.subscribedUsers.includes(channel._id)) {
      await axios.put(`/users/unsubscribe/${channel._id}`).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    }
    else {
      await axios.put(`/users/subscribe/${channel._id}`).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    }

    dispatch(subscription(channel._id))

  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        {currentVideo !== null ? (<>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>{currentVideo.views || 0} views {format(currentVideo.createdAt)}</Info>
            <Buttons>
              <Button onClick={handleLike} title="Like video">
                {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlined />} {currentVideo.likes.length}
              </Button>
              <Button onClick={handleDisLike} title="Dislike video">
                {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlined />} {currentVideo.dislikes.length} Dislike{currentVideo.dislikes.length !== 1 && 's'}
              </Button>
              <Button>
                <ReplyOutlined />
                Share
              </Button>
              <Button>
                <AddTaskOutlined />
                Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          {channel !== null ? <Channel>
            <ChannelInfo>
              <AvatarWrapper>
                <Avatar src={channel.img} />
              </AvatarWrapper>
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>{channel.subscribers || 0} Subscribers</ChannelCounter>
                <ChannelDescription>{currentVideo.desc}</ChannelDescription>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSubscription}>{currentUser.subscribedUsers?.includes(channel._id) ? 'Subscribed' : 'Subscribe'}</Subscribe>
          </Channel> : 'Getting channel info...'}
          <Hr />
          <Comments videoId={currentVideo._id} />
        </>) : 'Loading...'}
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  )
}

export default Video