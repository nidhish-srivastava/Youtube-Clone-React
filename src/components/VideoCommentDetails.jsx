import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function VideoCommentDetails(){
  const { id } = useParams()
  const [comment, setComment] = useState([])

  const getCommentData = async () => {
    const response = await axios.get(`https://youtube-v31.p.rapidapi.com/commentThreads`, {
      params: { part: 'snippet', videoId: `${id}`, maxResults: '100' },
      headers: {
        'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    })
    console.log("VideoCommentDetails",response.data.items)
    setComment(response.data.items)
    setCommentMainDetails(response.data)
  }

  useEffect(() => {
    // getCommentData()
  }, [id])

  return(
    <div className="comment-card-container">
    <h3>Comments:</h3>
    {comment?.map((currEle, index) => {
      const { snippet } = currEle
      let date = new Date(snippet?.topLevelComment?.snippet?.publishedAt)
      let comment = snippet?.topLevelComment?.snippet?.authorChannelId?.value
      console.log(comment)
      return (
        <div className="commentCard" key={index}>
         <Link to={`/channel/${comment}`}>
          <div className="left">
            <img src={snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" />
          </div>
         </Link>
          <div className="right">
            <h5>{snippet?.topLevelComment?.snippet?.authorDisplayName} <span>
              {date.toLocaleDateString()}
            </span>
            </h5>
            <div className='c'>{snippet?.topLevelComment?.snippet?.textDisplay}</div>
          </div>
        </div>
      )
    })
    }
  </div>
  )
}

export default VideoCommentDetails
