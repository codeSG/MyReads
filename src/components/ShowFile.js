import React from 'react'
import { useSearchParams , useParams } from 'react-router-dom'
import urlHelper from '../utils/urlHelper';
const ShowFile = () => {
  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 
  console.log( obj ) ; 
  console.log( searchParams)

  return (
    <div>
      <iframe  src={obj[url]} width='600px' height='600px' ></iframe>
      <h1>In show file Psg , {url} </h1>
    </div>
  )
}

export default ShowFile