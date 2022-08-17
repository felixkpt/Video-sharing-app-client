import styled from 'styled-components'

import FelixTube from '../img/logo.png'

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PrimaryButton } from './Buttons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Container = styled.div`
flex:1;
background-color: ${({ theme }) => theme.bg};
min-height:max(100vh, 400px);
color:${({ theme }) => theme.text};
position:sticky;
top: 0;
overflow: hidden auto;
min-width: 280px;
`
const Wrapper = styled.div`
padding: 5px 25px;
`

const Logo = styled.div`
display:flex;
align-items:center;
gap:5px;
font-weight:bold;
margin-bottom:10px;
`

const Img = styled.img``

const Item = styled.div`
display:flex;
align-items:center;
gap:5px;
cursor:pointer;
padding:5.5px 0px;
&:hover{
  background-color: ${({ theme }) => theme.bgLighter};

}
`
const Hr = styled.hr`
margin:5px 0;
border: 0.5px solid ${({ theme }) => theme.soft};
`
const Login = styled.div`
font-size: 80%;
`
const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 10px;
text-transform: uppercase;
`

function Menu({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector(state => state.user)

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={FelixTube} />
            FelixTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="/trending" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        {!currentUser && <>
          <Hr />
          <Login>
            Sign in to like videos, comment, and subscribe
            <Link to="sign-in" style={{ textDecoration: "none", color: "inherit" }}>
              <PrimaryButton><AccountCircleIcon />Sign in</PrimaryButton>
            </Link>
          </Login>
          <Hr />
        </>}
        <Title>Best of Felix</Title>
        <Item>
          <SportsBasketballIcon />
          Sports
        </Item>
        <Item>
          <MusicVideoIcon />
          Music
        </Item>
        <Item>
          <LocalMoviesIcon />
          Movies
        </Item>
        <Item>
          <NewspaperIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <ReportIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? 'Light' : 'Night'} mode
        </Item>

      </Wrapper>
    </Container>
  )
}

export default Menu