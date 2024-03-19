import React, { useRef, useEffect, useState } from 'react';
import "../style/BetterFile.css"
import { ContextInfo  } from '../App';

const DeleteCanvasComponent = ({ originalFile , fileList, deleteteCanvasImage , deleteBookID , bookImageSubstitue , bookClass , bookRecentlyViewed}) => {
  const canvasRef = useRef(null);


// alert("DeleteCanvasComponentDeleteCanvasComponentDeleteCanvasComponent") ; 
// alert(" deletr canavs componenet ")
  // const {  originalFile , fileList } = useContext( ContextInfo )
const [error , setError ] = useState( false  ) ; 
  const pdfDoc = useRef(null)  ; 

  async function loadNewDocument(doc, pageNo ) {


    // alert( pageNo )
      pdfDoc.current = doc;
    
      // const pageNo = Number( sessionStorage.getItem("currentPage") ) ; 
    
    
    // const totalPage = pdfDoc.current.numPages;
    // sessionStorage.setItem("totalPage" , totalPage ) ; 
    
    // Log the total number of pages
    // console.log('Total number of pages:', totalPage);
    // setTotalPages(totalPage ) 
    console.log( " is it null " , pdfDoc.current ) ;
    
    
    
    
    const page = await pdfDoc.current.getPage(pageNo);
    
    
    const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          if( !canvas ) return ;
        const canvasContext = canvas.getContext('2d');
    
        // CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 
    
        // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        // canvasContext.beginPath();
    
        canvas.height = viewport.height;
        canvas.width = viewport.width;
    
        // Render PDF page into canvas context.
        const renderContext = { canvasContext, viewport };
        const renderTask =  page.render(renderContext);
    
        // const temp = pageNo + " / " + totalPage ; 
        // completedPageLabelRef.current.innerText = temp ; 
    

    
    }

  async function pageMovement(    pageNo, objUrl  ) {
    // if( objectURL === "" ) return ; 
    // We import this here so that it's only loaded during client-side rendering.

    // alert( pageNo)
    

    // const objUrl =  sessionStorage.getItem( "objectUrl"  ) ; 
    if( !objUrl) return ;
    const pdfURL = objUrl ;  
    const pdfJS = await import('pdfjs-dist/build/pdf'); 

    pdfJS.GlobalWorkerOptions.workerSrc =
      window.location.origin + '/pdf.worker.min.mjs';


      pdfJS.getDocument({ url: pdfURL }).promise
      .then((doc) => {
          // Check if pdfDoc exists and destroy it
          if (pdfDoc.current) {
              pdfDoc.current.destroy().then(() => {
                  pdfDoc.current = null; // Set to null after destruction
                  loadNewDocument(doc , pageNo );
              }).catch((error) => {
                  console.error('Error destroying previous document:', error);
              });
          } else {
            console.log( " I got the new Doc here " , doc )
              loadNewDocument(doc , pageNo );

          }
      })
      .catch((error) => {
          console.error('Error loading PDF document:', error);
      });




    // if( recordTotalPage === -1 )  updateTotalPagesOfBook(totalPage) ; 
  }


  useEffect(() => {

    console.log( " 1111111111111 the frequent books ")
    console.log( "the orginal file was" , originalFile ) ;
    console.log( "the book ID was " , deleteBookID )
    // console.log(" the  originanFile is " , originalFile , " the id is " , bookID )
   function fun(){

    // alert("222222222")
    
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
      console.log( "the book ID was " , deleteBookID ) 
    //   console.log( )
      let arr = originalFile.filter( ele => ele.id === deleteBookID ) ; 
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
      pageMovement(1 , objectUrl )

    // Example: Draw a red rectangle on the canvas
    // ctx.fillStyle = 'red';
    // ctx.fillRect(10, 10, 100, 100);



   }

   fun() ; 
  }, [deleteBookID , originalFile  ,  fileList , deleteteCanvasImage  ]); // This effect runs only once when the component mounts

  if( error ){
    return <img src={bookImageSubstitue}  className={bookClass}/>
  }

  return <canvas className={bookClass} ref={canvasRef}  />;
};

export default DeleteCanvasComponent;
