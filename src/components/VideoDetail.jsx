import {useState, useEffect} from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from "react-player"
import { CheckCircle } from '@mui/icons-material'

import {Videos} from "../components"
import { FetchFromAPI } from './utils/FetchFromAPI'

const VideoDetail =() => {

  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const {id} = useParams();

  useEffect(() => {
    FetchFromAPI(`videos?part=snippet,statistics&id${id}`)
    .then((data) => setVideoDetail(data.items[0]))

    FetchFromAPI(`videos?part=snippet&relatedToVideoId${id}&type=video`)
    .then((data) => setVideos(data.items))
  }, [id])

  if(!videos?.length) { 
    return <p style={{color:"red"}}>Loading...</p>;
  }


  const {snippet:{title, channelId, channelTitle}, statistics:{
    viewCount, likeCount
  }} =videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{xs:"column", md:"row"}}>
        <Box flex={1}>
          <Box sx={{width:"100%", position:"sticky", top:"86px"}} >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
            />  
            <Typography color="#fff" variant='h5' fontWeight="bold" p={2} >
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color:"#fff"}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:"subtilte1", md :"h6"}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{fontSize:"12px", color:"gray", ml:"5px"}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>

                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center">
            <Videos videos={videos} direction="column"/>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail