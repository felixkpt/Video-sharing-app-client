import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import Avatar from './Avatar'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Container = styled.div``
const NewComment = styled.div`
display: flex;
align-items:center;`

const Input = styled.input`
border:none;
border-bottom:1px solid ${({theme}) => theme.soft};
outline: none;
background: transparent;
padding: 5px;
width: 100%;

`

function Comments({ videoId }) {
  const currentUser = useSelector(state => state.user)

  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    fetchComments()

  })
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder='Add a comment...'/>
        </NewComment>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  )
}

export default Comments