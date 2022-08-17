import React, { useState } from 'react'
import styled from 'styled-components'
import { PrimaryButton } from './Buttons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutLinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Upload from './Upload';

const Container = styled.div`
position: sticky;
top:0;
background-color: ${({ theme }) => theme.bgLighter};
height: 56px;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content: flex-end;
height:100%;
padding: 0 20px;
position: relative;
`

const Search = styled.div`
position: absolute;
left:0;
right: 0;
margin:auto;
width: 50%;
display:flex;
justify-content: space-between;
align-items: center;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
`

const Input = styled.input`
border:none;
outline: none;
background-color: transparent;
width: 100%;
height: 100%;
color: ${({ theme }) => theme.text};
`
const User = styled.div`
display: flex;
align-items: center;
gap:10px;
font-weight:500;
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #ccc;
`
const Username = styled.div`
font-size: 70%;
@media(max-width: 992px) {
  width: 4vw;
  overflow: hidden;
}`

function NavBar() {

  const { currentUser } = useSelector(state => state.user)

  const [open, setOpen] = useState(false)

  const [q, setQ] = useState('')

  const navigate = useNavigate()

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder='Search...' onChange={e=>setQ(e.target.value)} />
            <SearchOutLinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? <User>
            <VideoCallIcon onClick={() => setOpen(true)} />
            <Avatar src={currentUser.img} referrerpolicy="no-referrer" />
            <Username>{currentUser.name}</Username>
          </User> : <Link to="sign-in" style={{ textDecoration: "none", color: "inherit" }}>
            <PrimaryButton><AccountCircleIcon />Sign in</PrimaryButton>
          </Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default NavBar