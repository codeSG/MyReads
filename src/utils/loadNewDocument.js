async function loadNewDocument(doc, pageNo  , pdfDoc, canvasRef) {


    pdfDoc.current = doc;

  const page = await pdfDoc.current.getPage(pageNo);
  
  
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = canvasRef.current;
  if( !canvas ) return ; 
      const canvasContext = canvas.getContext('2d');
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // Render PDF page into canvas context.
      const renderContext = { canvasContext, viewport };
      const renderTask =  page.render(renderContext);
     
  }
  export default loadNewDocument ; 