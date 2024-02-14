import React , {useState, useRef , useContext, useEffect }from 'react'
import "./style/ClockMessage.css"
import {storage} from "../firebase" ;
import { ContextInfo } from '../../App';
import { useSearchParams } from 'react-router-dom';
import {ref,updateMetadata, uploadBytes , listAll, getDownloadURL, deleteObject, getMetadata} from "firebase/storage" ; 
import 'boxicons';

const ClockMessage = ({fileList, clockMessageRef}) => {

    const {hashID , setHashID ,  metadataPath, setMetadataPath} = useContext(ContextInfo) ; 
    // alert( `hashID${hashID}` ) ; 
    // alert(`metadataPath ${metadataPath}`)
    const [msg, setMsg] = useState("") ;
    const divRef = useRef(null) ;
    const [msgArr, setMsgArr] = useState([]);
   const [timer, setTimer ] = useState(0) ; 
    const [ comment , setComment] = useState(" Comments here...") ; 
    
  const [searchParams, setSearchParams] = useSearchParams() ;
  const url= searchParams.get("url") ; 
  const [bookIndex , setBookIndex] = useState(Number( url ) ) ;
  const [visible, setVisible] = useState("visible") ; 
  const [read, setRead] = useState( false  ) ; 
  const[ timeInterval , setTimeInterval ] = useState(null) ; 

    useEffect(()=>{

        // const interval = setInterval( ()=> {
        //     setTimer(prev => prev+2)
        // } ,120*1000)
        if( hashID ) localStorage.setItem( "hashID" , hashID ) ; 
        if( metadataPath ) localStorage.setItem( "metadataPath" , metadataPath ) ;
        
        const hash  = localStorage.getItem("hashID") ; 
        const metaDataP = localStorage.getItem("metadataPath") ; 
        console.log( hash, metaDataP ) ; 
        // const listRef = ref( storage , `${hash}/`) ; 
        async function fun(){
            
            try {
                const metaRef = ref( storage ,fileList[bookIndex].path ) ;
                const metaData= await  getMetadata(metaRef) ;
                const obj = metaData.customMetadata ;
                console.log( "metaata.custommetadata" , metaData.customMetadata,  obj ) 
                const arr = JSON.parse(metaData.customMetadata.messageBody) ;
                // alert(arr) ; 
                console.log( "arrrrrrrrrrrrrr", arr) ; 
                setMsgArr(arr) ; 
             } catch (error) {
              alert( " Error ocurred in getMatadata ") ; 
            //   console.error("Error fetching data:", error);
            }
  
          }
          fun()

        //   return ()=> clearInterval(interval) ; 

    }, [])
    
    function playButton(){
        if( timer === 0 ) return ;
        
        setVisible( prev=> prev==='visible' ? "hidden":"visible")
       
            const timeId = setInterval(() => {
                setTimer(prev => prev === 0 ? prev : prev - 1);
            }, 1000);
            // 
            setTimeInterval(timeId)

    }
    function squareButton(){
        setTimer(0) ; 
        setVisible( prev=> prev==='visible' ? "hidden":"visible")
        clearInterval(timeInterval ) ; 
        // timeInterval = false ; 
        setRead( false  ) ; 
        // setVisible(prev=>{return prev==="visible" ?"hidden" : "visible"}) ;

    }
    async function saveChanges(){
        const msg = divRef.current.textContent ; 
        const pageNumber =  fileList[bookIndex].currentPage ; 
        alert(`${msg} , ${pageNumber}`)
        const obj  = {page: pageNumber , message:msg} ; 
        const newMsgArr = [ ...msgArr ,  obj ]
        setMsgArr( (prev)=> [...prev, obj] ) 
        console.log( "msgArr",msgArr)  ; 

        const metaRef = ref( storage , fileList[bookIndex].path ) ;
        console.log( "originalFile[bookIndex].path " , fileList[bookIndex].path );
        const metaData= await  getMetadata(metaRef) ;
        const objMetaData = metaData.customMetadata ; 
        const tttt = JSON.stringify(newMsgArr)  
        alert(`objMetaData ${objMetaData}`)
        console.log("objMetaData" , objMetaData ) ; 
        objMetaData.messageBody = tttt 
        console.log("objMetaData" , objMetaData ) ;
        const newMetadata = {
            "customMetadata": objMetaData 
        }         
         
        ;
        console.log( newMetadata ) ; 
        console.log("newMetadata" , newMetadata ) ; 
        const resultMetaData = await updateMetadata(metaRef, newMetadata) ; 
        console.log("resultMetaData" , resultMetaData) ;
        setComment("Comments here...")

    }
  return (
    <div  ref={clockMessageRef} id="messageRight">
            
    <div id="first">
        <p id="timer">TIMER</p>
        <div id="clock">
            <input type="text" id="time" value={timer}  onChange={e => setTimer( Number(e.target.value.substring(0,2)))}  readOnly={read}>
               
            </input>
            <p id="min">min</p>
            <div id="icons" >
            
            <box-icon onClick={()=>squareButton()} name='square' style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} ></box-icon>
        <box-icon onClick={()=>playButton()} name='play-circle' style={{ visibility: visible }}></box-icon>
        <box-icon style={{ visibility: visible === "hidden" ? "visible" : "hidden" }} name='pause-circle'></box-icon>

            
            </div>
        </div>
    </div>
    
    <div id="second">
        <p id="notes">NOTES</p>
            <div id="message">
                <div id="messageDiv" style={ msgArr.length === 0 ? {padding:"0"}:{}}>
                { 
                    msgArr.map( (ele,ind)=>{
                        return( 
                            <div className="messagesBody">
                            <p className="pageNumber">
                               {`page ${ele.page}`}
                            </p>
                            <p className="pageBody" >
                               {ele.message}
                            </p>

                            </div>
                        )
                    })
                }
                    
                </div>
               
            </div>
            <div id="wrapper">
                <div ref={divRef} 
                onFocus={()=> {if(comment)  setComment("") ; } } onKeyDown={(e)=> {if(e.key === 'Enter') saveChanges()}} contentEditable={true} id="messageContent">
                 {comment}
                </div>
                {/* <input placeholder="Enter your Comment"></input> */}
            </div>
       
    </div>
</div>
  )
}

export default ClockMessage