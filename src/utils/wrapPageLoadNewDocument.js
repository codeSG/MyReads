async function wrapPageLoadNewDocument(   pageNo, setCalendarEntry, singlePageMode, canvasRef, pdfDoc1, pdfDoc2, pdfDoc3, 
    completedPageLabelRef, leftCanvasRef, rightCanvasRef ) {


    const totalPage = pdfDoc1.current.numPages;
    sessionStorage.setItem("totalPage" , totalPage ) ; 
    
    // Log the total number of pages
    console.log('Total number of pages:', totalPage);
    // setTotalPages(totalPage ) 
    console.log( " is it null " , pdfDoc1.current ) ;
    
    
    
    
    // Prepare canvas using PDF page dimensions.
    
    const readingTimeOut = JSON.parse( localStorage.getItem("readingTimeOut"))
    if( readingTimeOut ){
      clearTimeout( readingTimeOut ) ; 
      console.log(" the time inteval isbing cleard here ", readingTimeOut)
    }
    console.log(" the time inteval isbing    NOT cleard here " ,readingTimeOut )
    
    const readTimeOut = setTimeout( ()=>{
      let calendarArr = JSON.parse(localStorage.getItem("calendarArray") ); 
      if( calendarArr){
        const date = new Date();
        let day = date.getDate();
        const key = Number(sessionStorage.getItem("bookKey"));
        const pageString = `${key}-${pageNo}` ; 
        calendarArr[day-1].pagesRead[pageString] = true ;
        calendarArr[day-1].readToday = true ; 
        // calendarArr[day-1].timeSpent =   ( calendarArr[day-1].timeSpent + 1 ) % 1000  ; 
        localStorage.setItem("calendarArray" , JSON.stringify(calendarArr)) ; 
        setCalendarEntry([...calendarArr])
      }
    
    } , 1000*60 ) ; 
    
    console.log(  "the readTimeOut" , readTimeOut ) ; 
    // setReadingTimeOut( readTimeOut ) ; 
    localStorage.setItem("readingTimeOut" , JSON.stringify( readTimeOut ))
    // alert( readingTimeOut )
    if( singlePageMode && canvasRef.current && pdfDoc3.current ){
    
      // alert(singlePageMode)
      const page = await pdfDoc3.current.getPage(pageNo);
    
    
    const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
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
    
        const temp = pageNo + " / " + totalPage ; 
        completedPageLabelRef.current.innerText = temp ; 
    
    
    
    
      
    }
    
    if( !singlePageMode && leftCanvasRef.current && rightCanvasRef.current && pdfDoc1.current && pdfDoc2.current){
    
      // alert("")
      // alert("if( !singlePageMode && leftCanvasRef.current && rightCanvasRef.current && pdfDoc1.current && pdfDoc2.current){")
      // alert(singlePageMode) ; 
      // THE CODR FOR SSHOWING THE LEFT  HALF PAGE 
    
      const page1 = await pdfDoc1.current.getPage(pageNo);
      
    const viewport = page1.getViewport({ scale: 1.5 });
    const canvas = leftCanvasRef.current;
    const canvasContext = canvas.getContext('2d');
    
    // CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 
    
    // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    // canvasContext.beginPath();
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render PDF page into canvas context.
    // alert( pageNo + 1 )
    const renderContext = { canvasContext, viewport };
    const renderTask =  page1.render(renderContext);
    
    const temp = pageNo + " / " + totalPage ; 
    completedPageLabelRef.current.innerText = temp ; 
    
    
    //   THE CODE FOR SHOWING THE RIGHT HALF PAGE 
    
    console.log(  pageNo +1 !==  totalPage ) ; 
    
    
     if( pageNo +1  <=  totalPage  ){
      rightCanvasRef.current.style.display = "block" ; 
            const page2 = await pdfDoc3.current.getPage(pageNo+1);
              
            const viewport = page2.getViewport({ scale: 1.5 });
            const canvas = rightCanvasRef.current;
            const canvasContext = canvas.getContext('2d');
    
            // CLEARING THE CANVAS HERE TO SOLVETHE PROBLEMOF RERENDER 
    
            // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            // canvasContext.beginPath();
    
            canvas.height = viewport.height;
            canvas.width = viewport.width;
    
            // Render PDF page into canvas context.
            const renderContext = { canvasContext, viewport };
            const renderTask =  page2.render(renderContext);
    
     }
     else{
      rightCanvasRef.current.style.display = "none" ; 
     }
    
    
    
    
    }
     
    }