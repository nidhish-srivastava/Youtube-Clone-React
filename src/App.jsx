import React from 'react'
import {
  BrowserRouter as Router,
  Routes,Route
} from 'react-router-dom'
import Header from './components/Header'
import SearchResult from './components/SearchResult'
import Feed from './components/Feed'
import ChannelDetail from './components/ChannelDetail'
import VideoDetailsContainer from './components/VideoDetailsContainer'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Feed/>} />
        <Route exact path='/search/:id' element={<SearchResult/>} />
        <Route exact path='/video/:id' element={<VideoDetailsContainer/>} />
        <Route exact path='/channel/:id' element={<ChannelDetail/>} />
      </Routes>
    </Router>
  )
}

export default App