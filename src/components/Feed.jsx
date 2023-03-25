import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Feed() {
  const [feedData,setFeedData] = useState([])
  const getFeedData = async() =>{
    const response = await axios.get(`https://youtube-v31.p.rapidapi.com/search`,{
      params: {
        q: '',
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'date'
      },
      headers: {
        'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    })
    console.log(response.data.items)
    setFeedData(response.data.items)
  }
  useEffect(()=>{
    getFeedData()
  },[])
  return (
    <div className='FeedContainer'>
        {feedData.map((currEle, index) => {
          const { snippet,id } = currEle
          let date  = new Date(snippet?.publishedAt)
            return (
              <Link to={`/video/${id?.videoId}`} key={index}>
                <div key={index} className='feed-container-card'>
                 <img src={snippet?.thumbnails?.high?.url} alt="" width='300px' />
                <h3>{snippet?.title}</h3> 
                <h4>{snippet.channelTitle}<span>
                  {date.toLocaleDateString()}
                  </span>
                  </h4>
              </div>
              </Link>
            )
        })}
    </div>
  )
}

export default Feed