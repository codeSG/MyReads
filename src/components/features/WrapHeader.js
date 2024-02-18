import React , { useContext } from 'react'

import "../../style/WrapPage.css"

// import { useContext } from 'react-router-dom'; 
import { ContextInfo } from '../../App';
function animate(clockMessageRef , pdfRef, btnRef){
    if( clockMessageRef.current.classList.contains("move"))
    {

     
      pdfRef.current.classList.remove("animationCenter")
        pdfRef.current.classList.add("animationBetween")
      
    //   btnRef.current.classList.remove("forward");
    //     btnRef.current.classList.add("backward");
      
        clockMessageRef.current.classList.remove("move")
        clockMessageRef.current.classList.add("moveBack");
        // btnRef.current.textContent="Expand";
        // console.log(pdfDivRef.current.classList)
        // document.querySelector(".abc").classList.remove("fullBlack") ; 
        // document.querySelector(".abc").classList.add("halfBlack") ;
        // setExpand(true);
        
        
    }else{
       
        pdfRef.current.classList.add("animationCenter");
        pdfRef.current.classList.remove("animationBetween");
        clockMessageRef.current.classList.remove("moveBack")
        clockMessageRef.current.classList.add("move");
        // btnRef.current.classList.add("forward");
        // btnRef.current.textContent="Colllapse";
        // btnRef.current.classList.remove("backward");
        // console.log(pdfDivRef.current.classList)
        // element.style.setProperty('--main-color', '#00ff00');


        // document.querySelector(".abc").classList.add("fullBlack") ; 
        // document.querySelector(".abc").classList.remove("halfBlack") ; 

      
        // document.querySelector(".def").classList.add("fullWidth_nine") ;
        // document.querySelector(".magazine").classList.add("fullWidth_nine") ;
        // document.querySelector(".turn-page-wrapper").classList.add("halfWidth_nine") ; 
        // document.querySelector(".react-pdf__Page").classList.add("halfWidth_nine") ; 
        // setExpand(false) ; 

    }
  }

const WrapHeader = ({clockMessageRef , pdfRef, btnRef}) => {
    // const { stopWatch , setStopWatch} = useContext(ContextInfo)
  return (
    <div id="wrapHeader">

        
    <div id="div1">
        <svg id="back" width="76" height="19" viewBox="0 0 76 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.420455 10.2273V8.86364L11.3977 3.27273V5.45454L2.97727 9.51136L3.04545 9.375V9.71591L2.97727 9.57955L11.3977 13.6364V15.8182L0.420455 10.2273ZM22.6839 18V0.545454H28.7862C30.0021 0.545454 31.005 0.755682 31.7947 1.17614C32.5845 1.59091 33.1726 2.15057 33.5589 2.85511C33.9453 3.55398 34.1385 4.32954 34.1385 5.18182C34.1385 5.93182 34.005 6.55114 33.7379 7.03977C33.4766 7.52841 33.13 7.91477 32.6982 8.19886C32.272 8.48295 31.8089 8.69318 31.3089 8.82955V9C31.843 9.03409 32.38 9.22159 32.9197 9.5625C33.4595 9.90341 33.9112 10.392 34.2749 11.0284C34.6385 11.6648 34.8203 12.4432 34.8203 13.3636C34.8203 14.2386 34.6214 15.0256 34.2237 15.7244C33.826 16.4233 33.1982 16.9773 32.3402 17.3864C31.4822 17.7955 30.3658 18 28.9908 18H22.6839ZM24.7976 16.125H28.9908C30.3714 16.125 31.3516 15.858 31.9311 15.3239C32.5163 14.7841 32.8089 14.1307 32.8089 13.3636C32.8089 12.7727 32.6584 12.2273 32.3572 11.7273C32.0561 11.2216 31.6271 10.8182 31.0703 10.517C30.5135 10.2102 29.8544 10.0568 29.093 10.0568H24.7976V16.125ZM24.7976 8.21591H28.718C29.3544 8.21591 29.9283 8.09091 30.4396 7.84091C30.9567 7.59091 31.3658 7.23864 31.6669 6.78409C31.9737 6.32955 32.1271 5.79545 32.1271 5.18182C32.1271 4.41477 31.8601 3.7642 31.326 3.23011C30.7919 2.69034 29.9453 2.42045 28.7862 2.42045H24.7976V8.21591ZM41.8729 18.3068C41.0433 18.3068 40.2905 18.1506 39.6143 17.8381C38.9382 17.5199 38.4013 17.0625 38.0036 16.4659C37.6058 15.8636 37.407 15.1364 37.407 14.2841C37.407 13.5341 37.5547 12.9261 37.8501 12.4602C38.1456 11.9886 38.5405 11.6193 39.0348 11.3523C39.5291 11.0852 40.0746 10.8864 40.6712 10.7557C41.2734 10.6193 41.8786 10.5114 42.4865 10.4318C43.282 10.3295 43.9268 10.2528 44.4212 10.2017C44.9212 10.1449 45.2848 10.0511 45.5121 9.92045C45.745 9.78977 45.8615 9.5625 45.8615 9.23864V9.17045C45.8615 8.32955 45.6314 7.67614 45.1712 7.21023C44.7166 6.74432 44.0263 6.51136 43.1001 6.51136C42.1399 6.51136 41.3871 6.72159 40.8416 7.14205C40.2962 7.5625 39.9126 8.01136 39.6911 8.48864L37.782 7.80682C38.1229 7.01136 38.5774 6.39205 39.1456 5.94886C39.7195 5.5 40.3445 5.1875 41.0206 5.01136C41.7024 4.82955 42.3729 4.73864 43.032 4.73864C43.4524 4.73864 43.9354 4.78977 44.4808 4.89204C45.032 4.98864 45.5632 5.19034 46.0746 5.49716C46.5916 5.80398 47.0206 6.26705 47.3615 6.88636C47.7024 7.50568 47.8729 8.33523 47.8729 9.375V18H45.8615V16.2273H45.7592C45.6229 16.5114 45.3956 16.8153 45.0774 17.1392C44.7592 17.4631 44.3359 17.7386 43.8075 17.9659C43.2791 18.1932 42.6342 18.3068 41.8729 18.3068ZM42.1797 16.5C42.9751 16.5 43.6456 16.3438 44.1911 16.0312C44.7422 15.7188 45.157 15.3153 45.4354 14.821C45.7195 14.3267 45.8615 13.8068 45.8615 13.2614V11.4205C45.7763 11.5227 45.5888 11.6165 45.299 11.7017C45.0149 11.7812 44.6854 11.8523 44.3104 11.9148C43.9411 11.9716 43.5803 12.0227 43.228 12.0682C42.8814 12.108 42.6001 12.142 42.3842 12.1705C41.8615 12.2386 41.3729 12.3494 40.9183 12.5028C40.4695 12.6506 40.1058 12.875 39.8274 13.1761C39.5547 13.4716 39.4183 13.875 39.4183 14.3864C39.4183 15.0852 39.6768 15.6136 40.1939 15.9716C40.7166 16.3239 41.3786 16.5 42.1797 16.5ZM56.8622 18.2727C55.6349 18.2727 54.5781 17.983 53.6918 17.4034C52.8054 16.8239 52.1236 16.0256 51.6463 15.0085C51.169 13.9915 50.9304 12.8295 50.9304 11.5227C50.9304 10.1932 51.1747 9.01989 51.6634 8.00284C52.1577 6.98011 52.8452 6.18182 53.7259 5.60795C54.6122 5.02841 55.6463 4.73864 56.8281 4.73864C57.7486 4.73864 58.5781 4.90909 59.3168 5.25C60.0554 5.59091 60.6605 6.06818 61.1321 6.68182C61.6037 7.29545 61.8963 8.01136 62.0099 8.82955H59.9986C59.8452 8.23295 59.5043 7.70455 58.9759 7.24432C58.4531 6.77841 57.7486 6.54545 56.8622 6.54545C56.0781 6.54545 55.3906 6.75 54.7997 7.15909C54.2145 7.5625 53.7571 8.13352 53.4276 8.87216C53.1037 9.60511 52.9418 10.4659 52.9418 11.4545C52.9418 12.4659 53.1009 13.3466 53.419 14.0966C53.7429 14.8466 54.1974 15.429 54.7827 15.8438C55.3736 16.2585 56.0668 16.4659 56.8622 16.4659C57.3849 16.4659 57.8594 16.375 58.2855 16.1932C58.7116 16.0114 59.0724 15.75 59.3679 15.4091C59.6634 15.0682 59.8736 14.6591 59.9986 14.1818H62.0099C61.8963 14.9545 61.6151 15.6506 61.1662 16.2699C60.723 16.8835 60.1349 17.3722 59.402 17.7358C58.6747 18.0938 57.8281 18.2727 56.8622 18.2727ZM66.8253 13.2273L66.7912 10.7386H67.2003L72.9276 4.90909H75.4162L69.3139 11.0795H69.1435L66.8253 13.2273ZM64.9503 18V0.545454H66.9616V18H64.9503ZM73.2685 18L68.1548 11.5227L69.5866 10.125L75.8253 18H73.2685Z" fill="black"/>
            </svg>
           
            
    </div>
    <div id="div2">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut consequatur beatae doloremque qui porro odit laborum non, eos dolore illo voluptate reiciendis ratione earum velit cum eius odio repudiandae aliquam vero commodi provident minima! Nulla labore, ipsa velit est consectetur et cupiditate consequatur, perferendis sapiente quas magni cum accusamus non, recusandae repellendus? Ipsum repudiandae ex sunt tempora deserunt iusto quidem aliquid, nemo recusandae quas, libero dolor dolorem pariatur adipisci esse praesentium voluptatum a fugit ducimus sint maxime ratione ea! Beatae, dolorem eveniet sunt optio alias amet veritatis tempora repellat doloribus quisquam expedita iusto veniam sequi quasi? Ullam magni debitis hic.</p>
        <span>...</span>
    </div>
    <div id="div3">
        <svg width="118" height="58" viewBox="0 0 118 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_31_27)">
            <rect x="4" width="110" height="50" rx="20" fill="white"/>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M86.128 15.8864L73.5904 13.8304C73.2468 13.7737 72.8948 13.7926 72.5592 13.8856C72.2235 13.9786 71.9121 14.1436 71.6465 14.3691C71.381 14.5945 71.1678 14.8751 71.0216 15.1913C70.8754 15.5075 70.7998 15.8517 70.8 16.2V31.7808C70.8 32.353 71.0044 32.9064 71.3764 33.3412C71.7484 33.7759 72.2635 34.0635 72.8288 34.152L85.8768 36.192C85.9909 36.2098 86.1075 36.2027 86.2186 36.1711C86.3297 36.1396 86.4326 36.0843 86.5203 36.0092C86.6081 35.9341 86.6785 35.841 86.7268 35.7361C86.775 35.6312 86.8 35.5171 86.8 35.4016V16.6752C86.7998 16.4854 86.7321 16.3018 86.609 16.1573C86.4859 16.0128 86.3154 15.9168 86.128 15.8864ZM73.328 15.4096L85.2 17.3552V34.4656L73.0768 32.568C72.8886 32.5387 72.717 32.4431 72.5929 32.2985C72.4688 32.1539 72.4004 31.9697 72.4 31.7792V16.2C72.3999 16.0841 72.425 15.9695 72.4736 15.8642C72.5222 15.7589 72.5931 15.6654 72.6813 15.5903C72.7696 15.5151 72.8731 15.46 72.9848 15.4288C73.0965 15.3976 73.2136 15.391 73.328 15.4096Z" fill="black"/>
            <mask id="path-3-inside-1_31_27" fill="white">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M98.8001 13.8C98.6698 13.8001 98.5398 13.8108 98.4113 13.832L85.8721 15.8848C85.685 15.9155 85.5149 16.0117 85.3921 16.1561C85.2693 16.3006 85.2018 16.484 85.2017 16.6736V35.4C85.2017 35.5155 85.2267 35.6296 85.275 35.7344C85.3232 35.8393 85.3937 35.9325 85.4814 36.0076C85.5691 36.0827 85.672 36.1379 85.7831 36.1695C85.8942 36.201 86.0108 36.2082 86.1249 36.1904L99.1729 34.1504C99.7382 34.0619 100.253 33.7743 100.625 33.3395C100.997 32.9048 101.202 32.3514 101.202 31.7792V16.2C101.202 15.8847 101.14 15.5725 101.019 15.2812C100.898 14.9899 100.721 14.7252 100.498 14.5024C100.275 14.2795 100.01 14.1027 99.719 13.9822C99.4276 13.8617 99.1154 13.7998 98.8001 13.8ZM98.9233 32.568L86.8001 34.4672V17.3552L98.6721 15.4096C98.7865 15.3913 98.9035 15.3981 99.015 15.4294C99.1266 15.4607 99.23 15.5158 99.3182 15.5909C99.4064 15.666 99.4773 15.7594 99.526 15.8645C99.5746 15.9697 99.5999 16.0841 99.6001 16.2V31.7792C99.5997 31.9697 99.5313 32.1539 99.4072 32.2985C99.2831 32.4431 99.1115 32.5386 98.9233 32.568Z"/>
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M98.8001 13.8C98.6698 13.8001 98.5398 13.8108 98.4113 13.832L85.8721 15.8848C85.685 15.9155 85.5149 16.0117 85.3921 16.1561C85.2693 16.3006 85.2018 16.484 85.2017 16.6736V35.4C85.2017 35.5155 85.2267 35.6296 85.275 35.7344C85.3232 35.8393 85.3937 35.9325 85.4814 36.0076C85.5691 36.0827 85.672 36.1379 85.7831 36.1695C85.8942 36.201 86.0108 36.2082 86.1249 36.1904L99.1729 34.1504C99.7382 34.0619 100.253 33.7743 100.625 33.3395C100.997 32.9048 101.202 32.3514 101.202 31.7792V16.2C101.202 15.8847 101.14 15.5725 101.019 15.2812C100.898 14.9899 100.721 14.7252 100.498 14.5024C100.275 14.2795 100.01 14.1027 99.719 13.9822C99.4276 13.8617 99.1154 13.7998 98.8001 13.8ZM98.9233 32.568L86.8001 34.4672V17.3552L98.6721 15.4096C98.7865 15.3913 98.9035 15.3981 99.015 15.4294C99.1266 15.4607 99.23 15.5158 99.3182 15.5909C99.4064 15.666 99.4773 15.7594 99.526 15.8645C99.5746 15.9697 99.5999 16.0841 99.6001 16.2V31.7792C99.5997 31.9697 99.5313 32.1539 99.4072 32.2985C99.2831 32.4431 99.1115 32.5386 98.9233 32.568Z" fill="black"/>
            <path d="M98.8001 13.8L98.7987 11.8L98.7985 11.8L98.8001 13.8ZM98.4113 13.832L98.7344 15.8057L98.7368 15.8053L98.4113 13.832ZM85.8721 15.8848L85.5489 13.9111L85.5481 13.9112L85.8721 15.8848ZM85.2017 16.6736L83.2017 16.672V16.6736H85.2017ZM85.2017 35.4H83.2017V35.4001L85.2017 35.4ZM86.1249 36.1904L86.4329 38.1665L86.4338 38.1664L86.1249 36.1904ZM99.1729 34.1504L99.4818 36.1264L99.4822 36.1263L99.1729 34.1504ZM101.202 31.7792H99.2017V31.7793L101.202 31.7792ZM101.202 16.2L99.2017 16.2V16.2H101.202ZM98.9233 32.568L98.6153 30.5918L98.6137 30.5921L98.9233 32.568ZM86.8001 34.4672H84.8001V36.8049L87.1096 36.4431L86.8001 34.4672ZM86.8001 17.3552L86.4766 15.3815L84.8001 15.6563V17.3552H86.8001ZM98.6721 15.4096L98.3567 13.4346L98.3486 13.4359L98.6721 15.4096ZM99.6001 16.2H101.6L101.6 16.1971L99.6001 16.2ZM99.6001 31.7792L101.6 31.7833V31.7792H99.6001ZM98.7985 11.8C98.5598 11.8002 98.3214 11.8198 98.0857 11.8587L98.7368 15.8053C98.7582 15.8018 98.7799 15.8 98.8016 15.8L98.7985 11.8ZM98.0881 11.8583L85.5489 13.9111L86.1952 17.8585L98.7344 15.8057L98.0881 11.8583ZM85.5481 13.9112C84.8932 14.0187 84.2979 14.3553 83.8681 14.8609L86.916 17.4513C86.7319 17.668 86.4767 17.8123 86.1961 17.8584L85.5481 13.9112ZM83.8681 14.8609C83.4384 15.3666 83.2022 16.0084 83.2017 16.672L87.2017 16.6752C87.2014 16.9596 87.1002 17.2346 86.916 17.4513L83.8681 14.8609ZM83.2017 16.6736V35.4H87.2017V16.6736H83.2017ZM83.2017 35.4001C83.2017 35.8043 83.2892 36.2036 83.4582 36.5707L87.0917 34.8982C87.1641 35.0555 87.2016 35.2266 87.2017 35.3998L83.2017 35.4001ZM83.4582 36.5707C83.6272 36.9379 83.8737 37.2641 84.1807 37.5269L86.7821 34.4884C86.9137 34.601 87.0193 34.7408 87.0917 34.8982L83.4582 36.5707ZM84.1807 37.5269C84.4876 37.7897 84.8479 37.983 85.2367 38.0934L86.3295 34.2456C86.4961 34.2929 86.6505 34.3757 86.7821 34.4884L84.1807 37.5269ZM85.2367 38.0934C85.6255 38.2038 86.0336 38.2288 86.4329 38.1665L85.8169 34.2142C85.988 34.1876 86.1629 34.1983 86.3295 34.2456L85.2367 38.0934ZM86.4338 38.1664L99.4818 36.1264L98.8639 32.1744L85.8159 34.2144L86.4338 38.1664ZM99.4822 36.1263C100.519 35.9641 101.463 35.4369 102.145 34.6398L99.1056 32.0393C99.0436 32.1118 98.9577 32.1597 98.8635 32.1745L99.4822 36.1263ZM102.145 34.6398C102.827 33.8427 103.202 32.8282 103.202 31.7791L99.2017 31.7793C99.2017 31.8746 99.1676 31.9669 99.1056 32.0393L102.145 34.6398ZM103.202 31.7792V16.2H99.2017V31.7792H103.202ZM103.202 16.2C103.202 15.6219 103.088 15.0495 102.866 14.5155L99.1712 16.0469C99.1913 16.0954 99.2017 16.1474 99.2017 16.2L103.202 16.2ZM102.866 14.5155C102.645 13.9815 102.321 13.4963 101.912 13.0877L99.0844 15.9171C99.1216 15.9542 99.1511 15.9983 99.1712 16.0469L102.866 14.5155ZM101.912 13.0877C101.503 12.6791 101.018 12.355 100.483 12.1341L98.9545 15.8304C99.0031 15.8504 99.0472 15.8799 99.0844 15.9171L101.912 13.0877ZM100.483 12.1341C99.9493 11.9131 99.3768 11.7996 98.7987 11.8L98.8014 15.8C98.8539 15.8 98.906 15.8103 98.9545 15.8304L100.483 12.1341ZM98.6137 30.5921L86.4905 32.4913L87.1096 36.4431L99.2328 34.5439L98.6137 30.5921ZM88.8001 34.4672V17.3552H84.8001V34.4672H88.8001ZM87.1235 19.3289L98.9955 17.3833L98.3486 13.4359L86.4766 15.3815L87.1235 19.3289ZM98.9874 17.3846C98.8164 17.4119 98.6415 17.4018 98.4747 17.355L99.5554 13.5037C99.1655 13.3943 98.7566 13.3708 98.3567 13.4346L98.9874 17.3846ZM98.4747 17.355C98.3079 17.3082 98.1533 17.2258 98.0214 17.1135L100.615 14.0683C100.307 13.8058 99.9452 13.6131 99.5554 13.5037L98.4747 17.355ZM98.0214 17.1135C97.8895 17.0012 97.7836 16.8616 97.7109 16.7044L101.341 15.0246C101.171 14.6572 100.923 14.3309 100.615 14.0683L98.0214 17.1135ZM97.7109 16.7044C97.6381 16.5472 97.6003 16.3761 97.6001 16.2029L101.6 16.1971C101.599 15.7921 101.511 15.3922 101.341 15.0246L97.7109 16.7044ZM97.6001 16.2V31.7792H101.6V16.2H97.6001ZM97.6001 31.775C97.6007 31.4892 97.7032 31.213 97.8893 30.9961L100.925 33.6008C101.359 33.0947 101.599 32.4502 101.6 31.7833L97.6001 31.775ZM97.8893 30.9961C98.0755 30.7792 98.3329 30.6359 98.6153 30.5918L99.2313 34.5441C99.8902 34.4414 100.491 34.1069 100.925 33.6008L97.8893 30.9961Z" fill="black" mask="url(#path-3-inside-1_31_27)"/>
            <path d="M53 15.25V36.375H23V15.25H27V13.625H33C33.9167 13.625 34.7969 13.7393 35.6406 13.9678C36.4844 14.1963 37.2708 14.5391 38 14.9961C38.7188 14.5391 39.5 14.1963 40.3438 13.9678C41.1875 13.7393 42.0729 13.625 43 13.625H49V15.25H53ZM43 15.25C42.2708 15.25 41.5625 15.3473 40.875 15.542C40.1875 15.7367 39.5625 16.0286 39 16.418V32.3379C39.6146 32.0586 40.2604 31.8512 40.9375 31.7158C41.6146 31.5804 42.3021 31.5085 43 31.5H47V15.25H43ZM29 31.5H33C33.6979 31.5 34.3854 31.5677 35.0625 31.7031C35.7396 31.8385 36.3854 32.0501 37 32.3379V16.418C36.4375 16.0371 35.8125 15.7493 35.125 15.5547C34.4375 15.36 33.7292 15.2585 33 15.25H29V31.5ZM25 34.75H37.5938C37.2604 34.4876 36.9219 34.2591 36.5781 34.0645C36.2344 33.8698 35.8802 33.7005 35.5156 33.5566C35.151 33.4128 34.7604 33.307 34.3438 33.2393C33.9271 33.1715 33.4792 33.1335 33 33.125H27V16.875H25V34.75ZM51 16.875H49V33.125H43C42.5208 33.125 42.0781 33.1589 41.6719 33.2266C41.2656 33.2943 40.875 33.4001 40.5 33.5439C40.125 33.6878 39.7656 33.8571 39.4219 34.0518C39.0781 34.2464 38.7396 34.4792 38.4062 34.75H51V16.875Z" fill="black"/>
            <g filter="url(#filter1_d_31_27)">
            <path d="M5 20C5 8.9543 13.9543 0 25 0H60V50H25C13.9543 50 5 41.0457 5 30V20Z" fill="#9153CE" fill-opacity="0.56" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_31_27" x="0" y="0" width="118" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_27"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_27" result="shape"/>
            </filter>
            <filter id="filter1_d_31_27" x="1" y="0" width="63" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_27"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_27" result="shape"/>
            </filter>
            </defs>
        </svg>
        <svg width="118" height="58" viewBox="0 0 118 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_31_28)">
            <rect x="4" width="110" height="50" rx="20" fill="white"/>
            <path d="M29.8125 13.5C29.0666 13.5 28.3512 13.7963 27.8238 14.3238C27.2963 14.8512 27 15.5666 27 16.3125V35.6875C27 36.4334 27.2963 37.1488 27.8238 37.6762C28.3512 38.2037 29.0666 38.5 29.8125 38.5H44.1875C44.5568 38.5 44.9226 38.4273 45.2638 38.2859C45.605 38.1446 45.9151 37.9374 46.1762 37.6762C46.4374 37.4151 46.6446 37.105 46.7859 36.7638C46.9273 36.4226 47 36.0568 47 35.6875V16.3125C47 15.9432 46.9273 15.5774 46.7859 15.2362C46.6446 14.895 46.4374 14.5849 46.1762 14.3238C45.9151 14.0626 45.605 13.8554 45.2638 13.7141C44.9226 13.5727 44.5568 13.5 44.1875 13.5H29.8125ZM28.875 16.3125C28.875 16.0639 28.9738 15.8254 29.1496 15.6496C29.3254 15.4738 29.5639 15.375 29.8125 15.375H44.1875C44.4361 15.375 44.6746 15.4738 44.8504 15.6496C45.0262 15.8254 45.125 16.0639 45.125 16.3125V35.6875C45.125 35.9361 45.0262 36.1746 44.8504 36.3504C44.6746 36.5262 44.4361 36.625 44.1875 36.625H29.8125C29.5639 36.625 29.3254 36.5262 29.1496 36.3504C28.9738 36.1746 28.875 35.9361 28.875 35.6875V16.3125ZM31.6875 19.125C31.4389 19.125 31.2004 19.2238 31.0246 19.3996C30.8488 19.5754 30.75 19.8139 30.75 20.0625C30.75 20.3111 30.8488 20.5496 31.0246 20.7254C31.2004 20.9012 31.4389 21 31.6875 21H42.3125C42.5611 21 42.7996 20.9012 42.9754 20.7254C43.1512 20.5496 43.25 20.3111 43.25 20.0625C43.25 19.8139 43.1512 19.5754 42.9754 19.3996C42.7996 19.2238 42.5611 19.125 42.3125 19.125H31.6875ZM30.75 31.3125C30.75 31.0639 30.8488 30.8254 31.0246 30.6496C31.2004 30.4738 31.4389 30.375 31.6875 30.375H42.3125C42.5611 30.375 42.7996 30.4738 42.9754 30.6496C43.1512 30.8254 43.25 31.0639 43.25 31.3125C43.25 31.5611 43.1512 31.7996 42.9754 31.9754C42.7996 32.1512 42.5611 32.25 42.3125 32.25H31.6875C31.4389 32.25 31.2004 32.1512 31.0246 31.9754C30.8488 31.7996 30.75 31.5611 30.75 31.3125ZM31.6875 24.75C31.4389 24.75 31.2004 24.8488 31.0246 25.0246C30.8488 25.2004 30.75 25.4389 30.75 25.6875C30.75 25.9361 30.8488 26.1746 31.0246 26.3504C31.2004 26.5262 31.4389 26.625 31.6875 26.625H42.3125C42.5611 26.625 42.7996 26.5262 42.9754 26.3504C43.1512 26.1746 43.25 25.9361 43.25 25.6875C43.25 25.4389 43.1512 25.2004 42.9754 25.0246C42.7996 24.8488 42.5611 24.75 42.3125 24.75H31.6875Z" fill="black"/>
            <path d="M71.8454 41.4583C70.9637 41.4583 70.2278 41.1952 69.6374 40.6691C69.0458 40.1418 68.75 39.4852 68.75 38.6994V20.3006C68.75 19.5148 69.0458 18.8588 69.6374 18.3326C70.2278 17.8053 70.9637 17.5417 71.8454 17.5417H100.155C101.036 17.5417 101.772 17.8053 102.363 18.3326C102.954 18.8588 103.25 19.5148 103.25 20.3006V38.6994C103.25 39.4852 102.955 40.1412 102.364 40.6674C101.773 41.1947 101.036 41.4583 100.155 41.4583H71.8454ZM71.8454 39.75H85.0417V19.25H71.8454C71.5515 19.25 71.2813 19.3593 71.0347 19.578C70.7893 19.7978 70.6667 20.0387 70.6667 20.3006V38.6994C70.6667 38.9613 70.7893 39.2022 71.0347 39.422C71.2813 39.6407 71.5515 39.75 71.8454 39.75ZM86.9583 39.75H100.155C100.448 39.75 100.719 39.6407 100.965 39.422C101.211 39.2022 101.333 38.9613 101.333 38.6994V20.3006C101.333 20.0387 101.211 19.7978 100.965 19.578C100.719 19.3593 100.448 19.25 100.155 19.25H86.9583V39.75ZM74.2796 35.4792H81.4287C81.7009 35.4792 81.929 35.3972 82.113 35.2332C82.2957 35.0692 82.3871 34.8659 82.3871 34.6233C82.3871 34.3807 82.2957 34.178 82.113 34.0151C81.929 33.8523 81.7009 33.7708 81.4287 33.7708H74.2796C74.0074 33.7708 73.7793 33.8528 73.5953 34.0168C73.4126 34.1808 73.3213 34.3841 73.3213 34.6267C73.3213 34.8693 73.4126 35.072 73.5953 35.2349C73.7793 35.3977 74.0074 35.4792 74.2796 35.4792ZM74.2796 30.3542H81.4287C81.7009 30.3542 81.929 30.2722 82.113 30.1082C82.2957 29.9442 82.3871 29.7409 82.3871 29.4983C82.3871 29.2557 82.2957 29.053 82.113 28.8901C81.929 28.7273 81.7009 28.6458 81.4287 28.6458H74.2796C74.0074 28.6458 73.7793 28.7278 73.5953 28.8918C73.4126 29.0558 73.3213 29.2591 73.3213 29.5017C73.3213 29.7443 73.4126 29.947 73.5953 30.1099C73.7793 30.2727 74.0074 30.3542 74.2796 30.3542ZM74.2796 25.2292H81.4287C81.7009 25.2292 81.929 25.1472 82.113 24.9832C82.2957 24.8192 82.3871 24.6159 82.3871 24.3733C82.3871 24.1307 82.2957 23.928 82.113 23.7651C81.929 23.6023 81.7009 23.5208 81.4287 23.5208H74.2796C74.0074 23.5208 73.7793 23.6028 73.5953 23.7668C73.4126 23.9308 73.3213 24.1341 73.3213 24.3767C73.3213 24.6193 73.4126 24.822 73.5953 24.9849C73.7793 25.1477 74.0074 25.2292 74.2796 25.2292ZM90.5713 35.4792H97.7204C97.9926 35.4792 98.2207 35.3972 98.4047 35.2332C98.5874 35.0692 98.6787 34.8659 98.6787 34.6233C98.6787 34.3807 98.5874 34.178 98.4047 34.0151C98.2207 33.8523 97.9926 33.7708 97.7204 33.7708H90.5713C90.2991 33.7708 90.071 33.8528 89.887 34.0168C89.7043 34.1808 89.6129 34.3841 89.6129 34.6267C89.6129 34.8693 89.7043 35.072 89.887 35.2349C90.071 35.3977 90.2991 35.4792 90.5713 35.4792ZM90.5713 30.3542H97.7204C97.9926 30.3542 98.2207 30.2722 98.4047 30.1082C98.5874 29.9442 98.6787 29.7409 98.6787 29.4983C98.6787 29.2557 98.5874 29.053 98.4047 28.8901C98.2207 28.7273 97.9926 28.6458 97.7204 28.6458H90.5713C90.2991 28.6458 90.071 28.7278 89.887 28.8918C89.7043 29.0558 89.6129 29.2591 89.6129 29.5017C89.6129 29.7443 89.7043 29.947 89.887 30.1099C90.071 30.2727 90.2991 30.3542 90.5713 30.3542ZM90.5713 25.2292H97.7204C97.9926 25.2292 98.2207 25.1472 98.4047 24.9832C98.5874 24.8192 98.6787 24.6159 98.6787 24.3733C98.6787 24.1307 98.5874 23.928 98.4047 23.7651C98.2207 23.6023 97.9926 23.5208 97.7204 23.5208H90.5713C90.2991 23.5208 90.071 23.6028 89.887 23.7668C89.7043 23.9308 89.6129 24.1341 89.6129 24.3767C89.6129 24.6193 89.7043 24.822 89.887 24.9849C90.071 25.1477 90.2991 25.2292 90.5713 25.2292Z" fill="black"/>
            </g>
            <defs>
            <filter id="filter0_d_31_28" x="0" y="0" width="118" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_28"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_28" result="shape"/>
            </filter>
            </defs>
        </svg>
         

    </div>
    <div id="div4">
        <svg   width="73" height="58" viewBox="0 0 73 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_31_49)">
            <rect x="4" width="64.0612" height="50" rx="20" fill="#9153CE" fill-opacity="0.25"/>
            <path d="M34.1167 19.795C34.3511 20.0057 34.6688 20.124 35 20.124C35.3313 20.124 35.649 20.0057 35.8834 19.795L37.55 18.295C37.7246 18.1377 37.8435 17.9373 37.8916 17.7192C37.9398 17.5011 37.915 17.2751 37.8205 17.0696C37.726 16.8642 37.566 16.6885 37.3606 16.5649C37.1552 16.4413 36.9138 16.3752 36.6667 16.375H33.3334C33.0863 16.3752 32.8448 16.4413 32.6395 16.5649C32.4341 16.6885 32.2741 16.8642 32.1796 17.0696C32.085 17.2751 32.0603 17.5011 32.1084 17.7192C32.1566 17.9373 32.2754 18.1377 32.45 18.295L34.1167 19.795ZM34.1167 30.205C34.3511 29.9943 34.6688 29.876 35 29.876C35.3313 29.876 35.649 29.9943 35.8834 30.205L37.55 31.705C37.7246 31.8623 37.8435 32.0627 37.8916 32.2808C37.9398 32.4989 37.915 32.7249 37.8205 32.9304C37.726 33.1358 37.566 33.3115 37.3606 33.4351C37.1552 33.5587 36.9138 33.6248 36.6667 33.625H33.3334C33.0863 33.6248 32.8448 33.5587 32.6395 33.4351C32.4341 33.3115 32.2741 33.1358 32.1796 32.9304C32.085 32.7249 32.0603 32.4989 32.1084 32.2808C32.1566 32.0627 32.2754 31.8623 32.45 31.705L34.1167 30.205Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.915 25L37.2266 24.7585C40.5191 22.2056 43.2565 19.1249 45.3 15.673C45.4849 15.3607 45.5809 15.012 45.5795 14.6581C45.5781 14.3042 45.4793 13.9562 45.2919 13.645C45.1046 13.3339 44.8344 13.0694 44.5057 12.8752C44.177 12.681 43.8 12.563 43.4083 12.532L41.4516 12.379C37.1587 12.0412 32.8412 12.0412 28.5483 12.379L26.5916 12.532C26.1999 12.563 25.8229 12.681 25.4942 12.8752C25.1655 13.0694 24.8954 13.3339 24.708 13.645C24.5206 13.9562 24.4218 14.3042 24.4204 14.6581C24.419 15.012 24.5151 15.3607 24.7 15.673C26.7434 19.1249 29.4809 22.2056 32.7733 24.7585L33.085 25L32.7733 25.2415C29.4806 27.7953 26.7431 30.877 24.7 34.33C24.5154 34.6423 24.4197 34.9908 24.4213 35.3445C24.4229 35.6982 24.5217 36.046 24.7091 36.3569C24.8964 36.6678 25.1664 36.9322 25.4949 37.1263C25.8234 37.3204 26.2002 37.4384 26.5916 37.4695L28.5483 37.6225C32.8416 37.9615 37.1583 37.9615 41.4516 37.6225L43.4083 37.4695C43.7998 37.4384 44.1766 37.3204 44.5051 37.1263C44.8336 36.9322 45.1035 36.6678 45.2909 36.3569C45.4782 36.046 45.5771 35.6982 45.5787 35.3445C45.5803 34.9908 45.4845 34.6423 45.3 34.33C43.2567 30.8776 40.5192 27.7964 37.2266 25.243L36.915 25ZM35.0066 23.509L35.01 23.506L35.595 23.053C38.6062 20.7179 41.1181 17.9073 43.0066 14.7595L41.2333 14.62C37.0857 14.2937 32.9143 14.2937 28.7666 14.62L26.9916 14.7595C28.8806 17.9079 31.393 20.7191 34.405 23.0545L34.9883 23.5075C34.9899 23.5082 34.9916 23.5087 34.9933 23.509H35C35.0022 23.5094 35.0044 23.5094 35.0066 23.509ZM35.01 26.494L35.0066 26.491H35C34.9978 26.4906 34.9955 26.4906 34.9933 26.491L34.9883 26.494L34.405 26.947C31.393 29.2824 28.8806 32.0936 26.9916 35.242L28.765 35.38C32.915 35.707 37.0866 35.707 41.2333 35.38L43.0066 35.2405C41.1182 32.0922 38.6064 29.281 35.595 26.9455L35.01 26.494Z" fill="black"/>
            </g>
            <defs>
            <filter id="filter0_d_31_49" x="0" y="0" width="72.0613" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_49"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_49" result="shape"/>
            </filter>
            </defs>
        </svg>

        <svg   width="73" height="58" viewBox="0 0 73 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_31_50)">
            <rect x="4" width="64.0612" height="50" rx="20" fill="white"/>
            <path d="M33.375 15.125V12.375H41.625V15.125H33.375ZM36.125 30.25H38.875V22H36.125V30.25ZM37.5 41.25C35.8042 41.25 34.2055 40.9237 32.704 40.271C31.2025 39.6183 29.8907 38.7301 28.7688 37.6063C27.6458 36.4833 26.758 35.1711 26.1054 33.6696C25.4527 32.1681 25.1259 30.5699 25.125 28.875C25.125 27.1792 25.4518 25.5805 26.1054 24.079C26.759 22.5775 27.6468 21.2657 28.7688 20.1438C29.8917 19.0208 31.2039 18.133 32.7054 17.4804C34.2069 16.8277 35.8051 16.5009 37.5 16.5C38.9208 16.5 40.2844 16.7292 41.5906 17.1875C42.8969 17.6458 44.1229 18.3104 45.2687 19.1812L47.1937 17.2563L49.1188 19.1812L47.1937 21.1062C48.0646 22.2521 48.7292 23.4781 49.1875 24.7844C49.6458 26.0906 49.875 27.4542 49.875 28.875C49.875 30.5708 49.5482 32.1695 48.8946 33.671C48.241 35.1725 47.3533 36.4843 46.2313 37.6063C45.1083 38.7292 43.7961 39.6174 42.2946 40.271C40.7931 40.9246 39.1949 41.2509 37.5 41.25ZM37.5 38.5C40.1583 38.5 42.4271 37.5604 44.3063 35.6813C46.1854 33.8021 47.125 31.5333 47.125 28.875C47.125 26.2167 46.1854 23.9479 44.3063 22.0688C42.4271 20.1896 40.1583 19.25 37.5 19.25C34.8417 19.25 32.5729 20.1896 30.6938 22.0688C28.8146 23.9479 27.875 26.2167 27.875 28.875C27.875 31.5333 28.8146 33.8021 30.6938 35.6813C32.5729 37.5604 34.8417 38.5 37.5 38.5Z" fill="black"/>
            </g>
            <defs>
            <filter id="filter0_d_31_50" x="0" y="0" width="72.0613" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_50"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_50" result="shape"/>
            </filter>
            </defs>
            </svg>
            
        <svg onClick={()=>animate(clockMessageRef , pdfRef, btnRef)}  width="73" height="58" viewBox="0 0 73 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_31_61)">
                <g filter="url(#filter1_d_31_61)">
                <rect x="4" width="64.0612" height="50" rx="20" fill="#9153CE" fill-opacity="0.25" shape-rendering="crispEdges"/>
                </g>
                <path d="M22 12V32H31.563L34.281 34.72L35.001 35.406L35.721 34.719L38.437 32H48V12H22ZM24 14H46V30H37.594L37.281 30.28L35 32.563L32.72 30.283L32.406 30.001H24V14ZM28 17V19H42V17H28ZM28 21V23H42V21H28ZM28 25V27H38V25H28Z" fill="black"/>
                </g>
                <defs>
                <filter id="filter0_d_31_61" x="0" y="0" width="72.0613" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_61"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_61" result="shape"/>
                </filter>
                <filter id="filter1_d_31_61" x="0" y="0" width="72.0613" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_31_61"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_31_61" result="shape"/>
                </filter>
                </defs>
        </svg>
                  
       
    </div>
    





    </div>
  )
}

export default WrapHeader