import React, { useRef, useEffect, useContext } from 'react';
import "../../css/BetterFile.css";
import pageMovement from '../../utils/pageMovement.js';
import { ContextInfo  } from '../../App';

const FrequentCanvasComponent = ({bookID , bookImageSubstitue , bookClass , bookRecentlyViewed}) => {
  const canvasRef = useRef(null);

  const {  originalFile } = useContext( ContextInfo )

  const pdfDoc = useRef(null)  ; 

 
 


  useEffect(() => {

   function fun(){

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if( !bookID || bookID === -1 ) {


        if (pdfDoc.current) {
            pdfDoc.current.destroy().then( ()=>{

                const img = new Image();
       
                img.src = bookImageSubstitue ; 
                img.onload = () => {
                    ctx.drawImage(img, 10, -20); // Draw the image at position (0, 0)
                    // ctx.fillRect(10, 10, 100, 100);
                  };
        
                  return ; 


            })
        }else{

            const img = new Image();
       
            img.src = bookImageSubstitue ; 
            img.onload = () => {
                ctx.drawImage(img, 10, -20); // Draw the image at position (0, 0)
                // ctx.fillRect(10, 10, 100, 100);
              };
    
              return ; 




        }
       
      }

      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
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
  }, [bookRecentlyViewed]); 

  return <canvas className={bookClass} ref={canvasRef}  />;
};

export default FrequentCanvasComponent;
