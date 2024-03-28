async function wrapPageLoadNewDocument(   pageNo, setCalendarEntry, singlePageMode, canvasRef, pdfDoc1, pdfDoc2, pdfDoc3, 
    completedPageLabelRef, leftCanvasRef, rightCanvasRef ) {


    const totalPage = pdfDoc1.current.numPages;
    sessionStorage.setItem("totalPage" , totalPage ) ; 
    
    const readingTimeOut = JSON.parse( localStorage.getItem("readingTimeOut"))
    if( readingTimeOut ){
      clearTimeout( readingTimeOut ) ; 
     
    }
    const readTimeOut = setTimeout( ()=>{
      let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
      if( calendarArr){
        const date = new Date();
        let day = date.getDate();
        const key = Number(sessionStorage.getItem("bookKey"));
        const pageString = `${key}-${pageNo}` ; 
        calendarArr[day-1].pagesRead[pageString] = true ;
        calendarArr[day-1].readToday = true ; 
        localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
        setCalendarEntry([...calendarArr])
      }
    
    } , 1000*60 ) ; 
 
    localStorage.setItem("readingTimeOut" , JSON.stringify( readTimeOut ))

    if( singlePageMode && canvasRef.current && pdfDoc3.current ){

      const page = await pdfDoc3.current.getPage(pageNo);
    
    
    const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
    
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = { canvasContext, viewport };
        const renderTask =  page.render(renderContext);
    
        const temp = pageNo + " / " + totalPage ; 
        completedPageLabelRef.current.innerText = temp ; 
    
      
    }
    
    if( !singlePageMode && leftCanvasRef.current && rightCanvasRef.current && pdfDoc1.current && pdfDoc2.current){

      const page1 = await pdfDoc1.current.getPage(pageNo);
      
    const viewport = page1.getViewport({ scale: 1.5 });
    const canvas = leftCanvasRef.current;
    const canvasContext = canvas.getContext('2d');
  
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = { canvasContext, viewport };
    const renderTask =  page1.render(renderContext);
    
    const temp = pageNo + " / " + totalPage ; 
    completedPageLabelRef.current.innerText = temp ; 
    
    console.log(  pageNo +1 !==  totalPage ) ; 
     if( pageNo +1  <=  totalPage  ){
      rightCanvasRef.current.style.display = "block" ; 
            const page2 = await pdfDoc3.current.getPage(pageNo+1);
              
            const viewport = page2.getViewport({ scale: 1.5 });
            const canvas = rightCanvasRef.current;
            const canvasContext = canvas.getContext('2d');
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = { canvasContext, viewport };
            const renderTask =  page2.render(renderContext);
    
     }
     else{
      rightCanvasRef.current.style.display = "none" ; 
     }
    
    
    }
     
    }