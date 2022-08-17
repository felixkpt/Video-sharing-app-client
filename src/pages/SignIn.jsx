import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice'
import { auth, provider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center ;
height: calc(100vh - 56px);
color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center ;
min-height: calc(100vh - 130px);
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
gap: 10px;
padding: 20px 50px;
`

const Title = styled.div`
font-size:24px;
`
const SubTitle = styled.div`
font-size: 20px;
font-weight: 300;
`
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`

const Button = styled.div`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft} ;

`
const More = styled.div`
display: flex;
margin-top:10px;
font-size: 12;
color: ${({ theme }) => theme.soft};
`
const Links = styled.div`
margin-left: 50px;
display: flex;
`
const Link = styled.div`
margin-left: 20px;
`

function SignIn() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(loginStart())

        try {
            const params = { email, password }

            const resp = await axios.post('http://localhost:8800/api/auth/sign-in', params, {
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (resp.status === 200) {
                dispatch(loginSuccess(resp.data))
            } else {
                dispatch(loginFailure(resp))
            }

        } catch (err) {
            dispatch(loginFailure())
        }

    }

    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
            axios.post('/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }).then((res) => {
                console.log(res.data)
                dispatch(loginSuccess(res.data))
            }).catch(err => {
                console.error(err)
                dispatch(loginFailure())
            })
        }).catch(err => {
            console.error(err)
            dispatch(loginFailure())
        })

    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to FelixTube</SubTitle>
                <Input placeholder='email' onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Title>or</Title>
                <Input placeholder='name' onChange={e => setName(e.target.value)} />
                <Input placeholder='email' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
                <Button>Sign up</Button>
            </Wrapper>
            <More>
                English (US)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn