import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useYtContextHook } from '../context'
import { Link } from 'react-router-dom'
function SearchResult() {
  const [apiData,setApiData] = useState([])
  const {searchInput,searchState} = useYtContextHook()
  
  const getData = async() =>{
    const response = await axios.get(`https://youtube-v31.p.rapidapi.com/search?q=${searchInput}&part=snippet,id&maxResults=50`,{
      headers: {
        'X-RapidAPI-Key': '41a7e22e49mshb8572605bad5e90p15ffc6jsna318b079e450',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    })
    // console.log("Results",response.data.items)
    setApiData(response.data.items)
  }
  useEffect(()=>{
       getData()
  },[searchState])
  return (
    <React.Fragment>

      <div className="resultsMainContainer">
        {apiData.map((currEle,index)=>{
          const {snippet,id} = currEle
          let date = new Date(snippet?.publishedAt).toLocaleDateString()
          let channelCheck = id?.channelId
          let videoCheck = id?.videoId
          return(
            <div key={index}>
             {channelCheck ? (
               <Link to={`/channel/${channelCheck}`}>
                <div key={index} className='resultContainer channel'>
                   <div className="left">
            <img src={snippet?.thumbnails?.medium?.url} className='channelImg'/>
          </div>
          <div className="right">
            <h3 className='title'>{snippet?.channelTitle}</h3>
            <div className='desc'>{snippet?.description}</div>
            <div className='date'>Published at : {date}</div>
          </div>
          </div>
          <hr />
              </Link>
             ) :(
              <Link to={`/video/${videoCheck}`}>
                <div key={index} className='resultContainer'>
            <div className="left">
            <img src={snippet?.thumbnails?.medium?.url} alt="" />
          </div>
          <div className="right">
            <h3 className='title'>{snippet?.channelTitle}</h3>
            <div className='desc'>{snippet?.description}</div>
            <div className='date'>Published at : {date}</div>
          </div>
          </div>
            </Link>)}
            
            </div>
          )
        })
        
}
      </div>

    </React.Fragment>
  )
}

export default SearchResult