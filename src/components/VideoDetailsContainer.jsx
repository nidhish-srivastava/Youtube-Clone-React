import VideoDetails from './VideoDetails'
import VideoCommentDetails from './VideoCommentDetails'
import SuggestedVideoDetails from './SuggestedVideoDetails'

function VideoDetailsContainer() {
  
  return (
    <div className='video-detail-Container'>
      <div className="left-side">
        <VideoDetails/>
        <VideoCommentDetails />
      </div>
      <SuggestedVideoDetails />
    </div>
  )
}

export default VideoDetailsContainer