import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useYtContextHook } from '../context'
import youtube from '../youtube2.png' 

function Header() {
  const {searchInput,searchHandler,searchState,setSearchState} = useYtContextHook()
  const navigate = useNavigate()

  // console.log(searchState)
  const enterKeyHandler= (inp) =>{
    if(searchInput.trim().length>1 && inp.key==='Enter'){
        setSearchState(true)
        navigate(`/search/${searchInput}`)
    }
      else{
        setSearchState(false)
      }
  }
  const clickHandler = () =>{
    searchInput.trim().length>1 && setSearchState(true)
    navigate(`/search/${searchInput}`)

  }

  return (
    <header className='nav-bar'>

      <div className="left">
      <Link to='/' className='logo'>
        <img src={youtube} width='90px' height='60px' alt="" />
      <h2>Youtube</h2>
      </Link>
      </div>

      <div className="searchContainer">
        <input type="search" placeholder='' value={searchInput} onChange={(e)=>searchHandler(e.target.value)}  className="search-bar" onKeyDown={enterKeyHandler}/>
        <span className='Searchicon' onClick={clickHandler}>
        <i className="fas fa-magnifying-glass"></i>
        </span>
      </div>

     
    </header>
  )
}

export default Header