import React, { useRef, useEffect, useState } from 'react';
import "../../css/BetterFile.css"
import { ContextInfo  } from '../../App';
import pageMovement from '../../utils/pageMovement.js';
const DeleteCanvasComponent = ({ originalFile , fileList , deleteBookID , bookImageSubstitue , bookClass , bookRecentlyViewed}) => {
  const canvasRef = useRef(null);


// alert("DeleteCanvasComponentDeleteCanvasComponentDeleteCanvasComponent") ; 
// alert(" deletr canavs componenet ")
  // const {  originalFile , fileList } = useContext( ContextInfo )
const [error , setError ] = useState( false  ) ; 
  const pdfDoc = useRef(null)  ; 

 

  


  useEffect(() => {


   function fun(){

    
    const canvas = canvasRef.current;
 if( !canvas ) {
  setError( true ) ; 
  return ; 
 } 
    const ctx = canvas.getContext('2d');
    if( !deleteBookID || deleteBookID === -1 ) {


        if (pdfDoc.current) {
            pdfDoc.current.destroy().then( ()=>{

                const img = new Image();
       
                img.src = bookImageSubstitue ; 
                img.onload = () => {
                    ctx.drawImage(img, 10, -20);
                  };
        
                  return ; 


            })
        }else{

            const img = new Image();
       
            img.src = bookImageSubstitue ; 
            img.onload = () => {
                ctx.drawImage(img, 10, -20); 
              };
    
              return ; 

        }
       
      }

      let arr = originalFile.filter( ele => ele.id === deleteBookID ) ; 
      if(  arr.length === 0  ) {


        if (pdfDoc.current) {
            pdfDoc.current.destroy().then( ()=>{

                const img = new Image();
       
                img.src = bookImageSubstitue ; 
                img.onload = () => {
                    ctx.drawImage(img, 10, -20); 
                  };
        
                  return ; 

            })
        }else{

            const img = new Image();
       
            img.src = bookImageSubstitue ; 
            img.onload = () => {
                ctx.drawImage(img, 10, -20);
              };
    
              return ; 

        }
       
      }
      const blob = new Blob(  [arr[0].data] , { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      pageMovement(1 , objectUrl , pdfDoc, canvasRef  ) ; 


   }

   fun() ; 
  }, [deleteBookID , originalFile  ,  fileList  ]); // This effect runs only once when the component mounts

  if( error ){
    return <img src={bookImageSubstitue}  className={bookClass}/>
  }

  return <canvas className={bookClass} ref={canvasRef}  />;
};

export default DeleteCanvasComponent;
