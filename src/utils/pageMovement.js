import loadNewDocument from './loadNewDocument';
async function pageMovement(    pageNo, objUrl, pdfDoc, canvasRef  ) {

    if( !objUrl) return ;
    const pdfURL = objUrl ;  
    const pdfJS = await import('pdfjs-dist/build/pdf'); 

    pdfJS.GlobalWorkerOptions.workerSrc =
      window.location.origin + '/pdf.worker.min.mjs';


      pdfJS.getDocument({ url: pdfURL }).promise
      .then((doc) => {
          if (pdfDoc.current) {
              pdfDoc.current.destroy().then(() => {
                  pdfDoc.current = null; // Set to null after destruction
                  loadNewDocument( doc, pageNo  , pdfDoc, canvasRef );
              }).catch((error) => {
                  console.error('Error destroying previous document:', error);
              });
          } else {
              loadNewDocument(doc , pageNo , pdfDoc, canvasRef );

          }
      })
      .catch((error) => {
          console.error('Error loading PDF document:', error);
      });



  }
  export default pageMovement ; 