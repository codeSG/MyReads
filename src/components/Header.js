import React , {useRef} from 'react'
import "../style/Header.css"
import shutdown from "../image/shutdown.png"
import { useOutletContext } from 'react-router-dom';
import {storage} from "./firebase" ; 
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject} from "firebase/storage" ; 
import {v4} from "uuid" ; 

const Header = ({fileUpload, setFileUpload,fileList ,setFileList}) => {
    // const [fileUpload, setFileUpload,fileList ,setFileList] = useOutletContext() ; 
    const uploadRef = useRef( null ) ; 
    function setUpload(){
        // alert("got clicked ")
        console.log( uploadRef ); 
        uploadRef.current.click() ; 
        // const upload = document.querySelector("#upload") ; 
        // const fileInput = document.querySelector("#fileInput") ; 
        // upload.addEventListener( 'click' , ()=>{
        //     fileInput.click() ;
        // })
        // fileInput.addEventListener( 'change' , ()=>{
        //     console.log(fileInput.files[0])  ; 
        // })
    }


    const uploadFile = ()=>{
        console.log("111111111111111 in the Header ");
        console.log( fileUpload) ;
        if( fileUpload === null ) return ; 
        console.log("2222222222222222 fileuplaod is not null ");
        const fileRef = ref( storage , `decostarsharma113@gmail.com/${fileUpload.name}-${v4()}`) ; 
        uploadBytes( fileRef , fileUpload ).then( (snapshot)=>{
            alert("image uploaded ");
            getDownloadURL( snapshot.ref).then( url =>{
                // const obj = urlHelper(0,0,0) ; 
                // const temp = "" + Object.keys(obj).length  ;
                // console.log( " the temp is " , temp );  
                // urlHelper( temp  , url , 1 ) 
                console.log(" uploaded successfully " , snapshot.ref)
                setFileList(prev=>[...prev , url]) ;
            })     
        })
    } 





  return (
    <div id="containerr1">
    <div id="boxx1">
        <img id="imgg" src="https://www.hip-books.com/wp-content/uploads/2020/01/0443f79590506ede414d369f0a92012c_taking-notes-clipart_1300-1204.jpeg" alt=""/>
        <p id="titlee">Kindle</p>
    </div>
    <div id="boxx2">
        <button  onClick={()=>setUpload()} id="uploadd"> Upload File  
        <input onChange={(e)=>{
            console.log("000000 a least file got selecetd " )
         console.log(e.target.files[0]);
            setFileUpload(e.target.files[0] );  uploadFile() ;
        }}id="fileInputt" ref={uploadRef} type="file" />    
        </button>
        <div id="boxx3">
            <img id="logoutt" src={shutdown} alt="no imae"/>
            <p id="logouttext">Signout</p>
        </div>

    </div>
    
    

</div>
  )
}

export default Header