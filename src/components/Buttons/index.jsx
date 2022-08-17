import styled from 'styled-components'

export const PrimaryButton = styled.div`
padding: 5px 15px;
background-color: transparent;
color: #3ea6ff;
border: 1px solid #3ea6ff;
border-radius: 3px;
font-weight: 500;
text-transform: uppercase;
display:flex;
gap:5px;
align-items:center;
cursor: pointer;
`

export const SecondaryButton = styled.button`
padding: 10px 15px;
background-color: ${({theme}) => theme.soft};
color: ${({theme}) => theme.textSoft};
border: none;
border-radius: 3px;
font-weight: 500;
text-transform: uppercase;
text-align: center;
display:flex;
gap:5px;
align-items:center;
justify-content: center;
cursor: pointer;
`