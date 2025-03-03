import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard } from "../components";
import { FetchFromAPI } from "./utils/FetchFromAPI";
import { Box } from "@mui/material";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    FetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    FetchFromAPI(`search?channelId=${id}&part=snippet&id&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  return (
    <Box>
      <Box>
        <div
          style={{
            background:" rgb(2,0,36)",
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(2,178,224,1) 0%, rgba(1,202,246,1) 0%, rgba(3,158,207,1) 1%, rgba(199,4,198,1) 100%, rgba(9,62,121,1) 100%)",
            zIndex: "10",
            height: "200px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2" >
          <Box sx={{mr:{sm:"100px"}}}/>
          <Videos videos={videos}/>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
