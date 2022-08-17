import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import NavBar from './components/NavBar';
import Home from './pages/Home'

import { darkTheme, lightTheme } from './utils/Theme';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import Search from './pages/Search';

const Container = styled.div`
display:flex;
`
const Main = styled.div`
flex:7;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
padding: 1vw 2vw;

`

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <NavBar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route path="subscriptions" element={<Home type="subscribed"/>} />
                  <Route path="search" element={<Search />}/>
                  <Route path="videos">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="sign-in" element={<SignIn/>}/>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
