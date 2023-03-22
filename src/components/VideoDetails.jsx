import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function VideoDetails(){
    const { id } = useParams()
    const [videoDetail, setVideoDetail] = useState([])
    
    
    const getData = async () => {
        const response = await axios.get(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails,snippet,statistics&id=${id}`, {
            headers: {
                'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
        })
        // console.log("Video Details",response.data.items)
        setVideoDetail(response.data.items)
    }
    
    useEffect(() => {
        getData()
      }, [id])
    
    return(
        <div>
        {videoDetail.map((currEle, index) => {
            const { snippet, statistics } = currEle
            return (
                <div key={index}  className='video'>
                <img src={snippet?.thumbnails?.high?.url} alt="" />
                <h2>{snippet?.title}</h2>
                <h3>Views : {statistics.viewCount}</h3>
                <h3>Likes : {statistics.likeCount}</h3>
              </div>
            )
        })}
        </div>
    )
}

export default VideoDetails