import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ChannelVideos from './ChannelVideos'
function ChannelDetail() {

  const { id } = useParams()
  const [channelDetails, setChannelDetails] = useState([])
  const getData = async () => {
    const response = await axios.get(`https://youtube-v31.p.rapidapi.com/channels?part=snippet,statistics&id=${id}`, {
      headers: {
        'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    })
    // console.log("Channel Details",response.data.items)
    setChannelDetails(response.data.items)
  }

  

  useEffect(() => {
    getData()
  }, [])

  return (
    <React.Fragment>
      <div>
        {channelDetails?.map((currEle, index) => {
          const { snippet , statistics} = currEle
          return (
            <div key={index} className='channel-container'>
              <div className="left">
                <img src={snippet.thumbnails.medium.url} alt="" className='channelImg' />
                <h2>{snippet?.title}</h2>
                <h3>{snippet?.customUrl}</h3>
                <h3>Subs : {statistics?.subscriberCount}</h3>
              </div>
              <div className="right">
                <p>{snippet?.description}</p>
              </div>
              </div>
             )
        })}
      </div>

     <ChannelVideos/>
    </React.Fragment>

  )
}

export default ChannelDetail