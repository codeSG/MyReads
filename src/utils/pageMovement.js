import loadNewDocument from './loadNewDocument';
async function pageMovement(    pageNo, objUrl, pdfDoc, canvasRef  ) {
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
                  loadNewDocument( doc, pageNo  , pdfDoc, canvasRef );
              }).catch((error) => {
                  console.error('Error destroying previous document:', error);
              });
          } else {
            // console.log( " I got the new Doc here " , doc )
              loadNewDocument(doc , pageNo , pdfDoc, canvasRef );

          }
      })
      .catch((error) => {
          console.error('Error loading PDF document:', error);
      });




    // if( recordTotalPage === -1 )  updateTotalPagesOfBook(totalPage) ; 
  }
  export default pageMovement ; 