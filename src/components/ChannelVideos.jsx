import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const ChannelVideos = () => {
    const { id } = useParams()
    const [channelVideos, setChannelVideos] = useState([])
    const getChannelVideos = async () => {
        const response = await axios.get(`https://youtube-v31.p.rapidapi.com/search`, {
            headers: {
                'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            },
            params: {
                channelId: `${id}`,
                part: 'snippet,id',
                maxResults: 50,
            }
        })
        console.log(response.data)
        setChannelVideos(response.data.items)
    }


    useEffect(() => {
        getChannelVideos()
    }, [])

    return (
        <React.Fragment>
            <nav className='channel-detail-nav'>
                <li>Videos</li>
                <li>About</li>
            </nav>
        <div className='channel-video-container' >
            {channelVideos.map((e, index) => {
                const { snippet, id } = e
                let date = new Date(snippet?.publishedAt)
                return (
                    <Link to={`/video/${id?.videoId}`} key={index}>
                        <div key={index} className='channel-video-card'>
                            <img src={snippet?.thumbnails?.high?.url} alt="" width='300px' />
                            <h3>{snippet?.title}</h3>
                            <h4>
                                {/* {snippet.channelTitle} */}
                            <span>
                            &nbsp; {date.toLocaleDateString()}
                            </span>
                            </h4>
                        </div>
                    </Link>
                )
            })}
        </div>
            </React.Fragment>
    )
}

export default ChannelVideos