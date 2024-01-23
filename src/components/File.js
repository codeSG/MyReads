import React from 'react'
import { useState , useEffect } from 'react' ; 
import {storage} from "./firebase" ; 
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject} from "firebase/storage" ; 
import {v4} from "uuid" ; 
import { Link } from 'react-router-dom';
import urlHelper from '../utils/urlHelper';
import obj from '../utils/emailSet';
import FileCard from './FileCard';
import { useOutletContext } from 'react-router-dom';
import DeletePopup from './DeletePopup';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';
import "../style/File.css"
const File = () => {
  const [ hash , setHash] = useSearchParams()  ;
  // const { setEmail , getEmail} = obj ;
  const [fileUpload, setFileUpload,fileList ,setFileList,spinner,fileName, setFileName , 
      hashID, setHashID ] = useOutletContext() ; 
    // const [fileUpload, setFileUpload] = useState(null)  ;
    // const [fileList ,setFileList] = useState( [] ) ;
    const tt =  hash.get("id") ;

    // alert(tt) ; 
    const [black , setBlack] = useState(false   ) ;  
    const [deleteName , setDeleteName ]  = useState("") ; 
    const [ deleteInd , setDeletInd ] = useState(-1) ; 
    
    const listRef = ref( storage , `${tt}/`) ;
    useEffect(()=>{

    }, [deleteInd])

    async function deleteFile(path) {
        try {
          // alert(path);
          const desertRef = ref(storage, path);
      
          // Delete the file
          await deleteObject(desertRef);
          alert("The File got deleted Successdully !!");
      
          const res = await listAll(listRef);
      
          // const ans = await Promise.all(
          //   res.items.map( async (item, ind) => {
          //     console.log("------");  
          //     console.log(item._location.path_);
      
          //     const url = await getDownloadURL(item);
          //     const temp = "" + ind;
          //     console.log("The temp is", temp);
          //     // urlHelper(temp, url, 1);
      
          //     return { "url": url, "path": item._location.path_ };
          //   })
          // );
          const ans= new Array( res.items.length )
          for( let i = 0 ; i < res.items.length ; i++ ){
                  const item = res.items[i] ; 
                  const url = await getDownloadURL(item);
                  ans[i] = { "url": url, "path": item._location.path_ };

          }
          // const ans = await Promise.all(
          //   res.items.map( async (item, ind) => {
          //     console.log("------");  
          //     console.log(item._location.path_);
      
          //     const url = await getDownloadURL(item);
          //     const temp = "" + ind;
          //     console.log("The temp is", temp);
          //     // urlHelper(temp, url, 1);
      
          //     return { "url": url, "path": item._location.path_ };
          //   })
          // );
      
          console.log("Ans is here");
          console.log(ans);
      
          setFileList(ans);
      
          console.log("FileList is here");
          console.log(fileList);
        } catch (error) {
          // Uh-oh, an error occurred!
          alert("Error occurred: " + error.message);
        }
      }
      
         
    const uploadFile = ()=>{
        if( fileUpload === null ) return ; 
        const fileRef = ref( storage , `${hash.get("id")}/${fileUpload.name}-${v4()}`) ; 
        uploadBytes( fileRef , fileUpload ).then( (snapshot)=>{
            // alert("image uploaded ");
            getDownloadURL( snapshot.ref).then( url =>{
                // const obj = urlHelper(0,0,0) ; 
                // const temp = "" + Object.keys(obj).length  ;
                // console.log( " the temp is " , temp );  
                // urlHelper( temp  , url , 1 ) 
                // console.log( snapshot.ref) ; 
            //     { "url": url, "path": item._location.path_ , 
            // "name" : item.name }
                setFileList(prev=>[...prev , {url : url ,path:snapshot.ref._location.path_,
                name:snapshot.ref.name }]) ;
            })
        }).then(()=> setFileUpload(null) )
    } 

    // useEffect(()=>{

    // } , [fileUpload] ) ; 
    useEffect( () => {
      // alert(getEmail()) ; 
        
        async function fun(){

          try {
            const res = await listAll(listRef);
            let ans = new Array(res.items.length );
        
            for (let ind = 0; ind < res.items.length; ind++) {
              const item = res.items[ind];
              console.log("------");
              console.log(item._location.path_);
        
              const url = await getDownloadURL(item);
        
              const temp = "" + ind;
              console.log("the temp is ", temp);
              urlHelper(temp, url, 1);
              if( ind === 0 ){
                console.log( "ind===0") ; 
                console.log( item.name  ) ; 
              }
              ans[ind] = { "url": url, "path": item._location.path_ , 
            "name" : item.name } ;
        
              console.log(fileList, "22222");
            }
        
            console.log("3333333");
            console.log(ans);
            setFileList(ans);
            console.log("fileList----", fileList);
          } catch (error) {
            console.error("Error fetching data:", error);
          }

        }
        fun() ; 
        setHashID(hash.get("id")) ; 

      }, []);
      // backgroundColor:"#f0f2f5"
  return (
    <div className="fileContainer" >
       
        {/* <div style={{display:"flex"}}> */}
        {

                
                 fileList.map( (ele, ind)  =>
                 
                  {
                     const key = "" + ind ; 
                        urlHelper( key, ele.url , 1 ) ; 
                    return(
                      
                        <FileCard  ind={ind} ele={ele} deleteFile={deleteFile}
                          setDeleteName={setDeleteName} setBlack={setBlack} 
                          setDeletInd={setDeletInd} setFileName={setFileName}
                        /> 
                                         
                       
                        
                    )
                  }
            )
            
           
        }
        {/* </div> */}
        {
          black && <div onClick={()=>{setDeletInd(-1) ; setBlack(false);}}
           style={{backgroundColor:"black", position:"absolute", 
          top:"0", left:"0", right:"0",bottom:"0",
          opacity:"0.6" , zIndex:"4" , width:"100%" , height:"100%"}}></div>
        }
        {
          black && <DeletePopup deleteName={deleteName} setBlack={setBlack}
            setDeletInd={setDeletInd}
            deleteInd={deleteInd} deleteFile={deleteFile}
          />
          
        }
        {
          spinner && <div>
              <div onClick={()=>{setDeletInd(-1) ; setBlack(false);}}
              style={{backgroundColor:"black", position:"absolute", 
              top:"0", left:"0", right:"0",bottom:"0",
              opacity:"0.6" , zIndex:"4" , width:"100%" , height:"100%"}}></div>
              <Spinner/>
          </div>
        }
        
        
        
    </div>
  )
}

export default File