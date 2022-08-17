import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SecondaryButton } from './Buttons/index';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { getInputAdornmentUtilityClass } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
justify-content: center;
align-items: center;

`
const Wrapper = styled.div`
width: 600px;
height: 600px;
background: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;

`
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`
const Title = styled.div`
font-weight: 500;
font-size: 1.5rem;
`
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.text};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background: transparent;
`

const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.text};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background: transparent;
`
const Label = styled.label`
font-size: 14px;
font-weight: 400;
`

function Upload({ setOpen }) {

    const [img, setImg] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgPercentage, setImgPercentage] = useState(0)
    const [videoPercentage, setVideoPercentage] = useState(0)
    const [inputs, setInputs] = useState({})
     const [tags, setTags] = useState([])

    const handleTags = (tags) => {
        setTags(tags.split(','))
    }

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage();
        const fileName = new Date().getTime() + file.name
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imgUrl' ? setImgPercentage(progress) : setVideoPercentage(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })

                });
            }
        );
    }
    useEffect(() => {
        video && uploadFile(video, 'videoUrl')
    }, [video])
    useEffect(() => {
        img && uploadFile(img, 'imgUrl')
    }, [img])

    const handleUpload = async e => {
        e.preventDefault()
        const res = await axios.post('/videos', {...inputs, tags})
        setOpen(false)

        res.status === 200 && navigate(`/videos/${res.data._id}`)

    }

    const navigate = useNavigate()
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)} title="Close"><HighlightOffIcon /></Close>
                <Title>Upload a New Video</Title>
                <Label>Video</Label>
                {videoPercentage > 0 ? (`Uploading ${videoPercentage.toFixed(0)}%`) : (<Input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />)}
                <Label>Title</Label>
                <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
                <Label>Description</Label>
                <Desc placeholder="Description" rows="9" name="desc" onChange={handleChange} />
                <Label>Video Tags</Label>
                <Input type="text" placeholder="Separator the tags with comma" onChange={e => handleTags(e.target.value)} />
                <Label>Image</Label>
                {imgPercentage > 0 ? (`Uploading ${imgPercentage.toFixed(0)}%`) : (<Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />)}
                <SecondaryButton onClick={handleUpload}>Upload</SecondaryButton>
            </Wrapper>
        </Container>
    )
}

export default Upload