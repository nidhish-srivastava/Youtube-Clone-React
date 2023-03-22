import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SuggestedVideoDetails() {
    const { id } = useParams()

    const [suggestedVideo, setSuggestedVideo] = useState([])

    const getSuggestedVideoData = async () => {
        const response = await axios.get(`https://youtube-v31.p.rapidapi.com/search`, {
            params: {
                relatedToVideoId: `${id}`,
                part: 'id,snippet',
                type: 'video',
                maxResults: '50'
            },
            headers: {
                'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
        })
        // console.log("Suggested Videos",response.data.items)
        setSuggestedVideo(response.data.items)
    }

    useEffect(() => {
        getSuggestedVideoData()
    }, [id])
    
    return (
        <div className="suggested-video-container">
            <h2>Suggested Videos</h2>
            {suggestedVideo.map((currEle, index) => {
                const { snippet, id } = currEle
                let videoCheck = id?.videoId
                let date = new Date(snippet?.publishedAt)
                return (
                    <Link to={`/video/${videoCheck}`}>
                        <div key={index} className='suggested-video-card'>
                            <img src={snippet?.thumbnails?.medium?.url} alt="" width='200px' />
                            <div className='right'>
                                <h5>{snippet?.title}</h5>
                                <h5>{snippet?.channelTitle} 
                                <span>
                                    {date.toLocaleDateString()}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

}

export default SuggestedVideoDetails