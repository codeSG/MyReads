import React, { useRef, useEffect, useContext } from 'react';
import "../../css/BetterFile.css";
import pageMovement from '../../utils/pageMovement.js';
import { ContextInfo  } from '../../App';

const FrequentCanvasComponent = ({bookID , bookImageSubstitue , bookClass , bookRecentlyViewed}) => {
  const canvasRef = useRef(null);

  const {  originalFile } = useContext( ContextInfo )

  const pdfDoc = useRef(null)  ; 

 
 


  useEffect(() => {

    console.log( " 1111111111111 the frequent books ")
    console.log( "the orginal file was" , originalFile ) ;
    console.log( "the book ID was " , bookID )
    // console.log(" the  originanFile is " , originalFile , " the id is " , bookID )
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

      console.log( " the frequent books ")
      console.log( "the orginal file was" , originalFile ) ;
      console.log( "the book ID was " , bookID ) 
    //   console.log( )
      let arr = originalFile.filter( ele => ele.id === bookID ) ; 
      if(  arr.length === 0  ) {


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
      console.log( " the arr which I got was this " , arr ) ; 
      const blob = new Blob(  [arr[0].data] , { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      pageMovement(1 , objectUrl , pdfDoc, canvasRef  ) ; 

    // Example: Draw a red rectangle on the canvas
    // ctx.fillStyle = 'red';
    // ctx.fillRect(10, 10, 100, 100);



   }

   fun() ; 
  }, [bookRecentlyViewed]); // This effect runs only once when the component mounts

  return <canvas className={bookClass} ref={canvasRef}  />;
};

export default FrequentCanvasComponent;
