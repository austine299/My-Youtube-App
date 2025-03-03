import React from 'react'
import { Stack, Box } from '@mui/material'
import {VideoCard, ChannelCard} from '../components'

function Videos({videos, direction}) {
  if(!videos?.length) { 
    return <p style={{color:"red"}}>Loading...</p>;
  }

  return (
    <Stack direction={direction || "row"}flexWrap="wrap" justifyContent="start" gap="0">
        {videos.map((item, idx) =>(
            <Box>
                {item.id.videoId && <VideoCard video={item}/>}
                {item.id.channelId && <ChannelCard channelDetail={item}/>}
            </Box>
        ))}

    </Stack>
  )
}

export default Videos