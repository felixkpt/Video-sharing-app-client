import styled from 'styled-components'

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
background:#999;
`

function Avatar({src}) {
  return (
    <Image src={src} />
  )
}

export default Avatar