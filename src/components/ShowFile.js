import React from 'react'
import { useSearchParams , useParams , useOutletContext} from 'react-router-dom'
import urlHelper from '../utils/urlHelper';
import "../style/ShowFile.css"
const ShowFile = () => {
  const [,,,,,fileName] = useOutletContext() ; 
  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const obj = urlHelper( 0 , 0  , 0  ) ; 
  console.log( obj ) ; 
  console.log( searchParams)

  return (
      <div>
              <iframe  className="ifram" src={obj[url]}  ></iframe>
              <h1 className="ifname">File Name:{fileName}</h1>
      </div>

      
     
    
  )
}

export default ShowFile