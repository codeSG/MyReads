
import React , {useContext , useState  , useEffect} from "react";
import "../../css/SendFeedBack.css"
import openBook from  "../../assets/openBook.png"
import goalsaathi from "../../assets/goalsaathi.png"
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SendFeedBack = ({setBlack , setSendFeedBack })=>{
    const [ senderMail , setSenderMail] = useState("") ; 
    const [ senderFeedBack , setSenderFeedBack]  = useState( "") ;
    const[borderStyle , setBorderStyle] = useState("") ; 
    const [ feedBackBorderStyle , setFeedBackBorderStyle] = useState("")   ; 
    const [ canSendEmail , setCanSendEmail] = useState( true ) ; 
    useEffect(()=>{
        const arr = JSON.parse( localStorage.getItem("setEmailUploadedToday") ) ;
        const temp = new Date() ; 
        const day = temp.getDate() ; 
        let emailUploaded = false  ; 
           if( arr && arr[0] === day && arr[1]){
            emailUploaded = true ; 
        }
        setCanSendEmail(!emailUploaded) ; 
        
    } , [] )
    

    function setEmailSent(){
        const temp = new Date() ; 
        const day = temp.getDate() ; 
        const arr = [ day , true ] ;
        localStorage.setItem("setEmailUploadedToday" , JSON.stringify(arr)) ; 
    }
    function validateEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        return isValidEmail ; 
    }
    const sendEmail = () => {
        if( !canSendEmail ){
            setBlack( false  ) ; 
            setSendFeedBack( false )  ; 
            toast.error("Can only send 1 mail per day ||") ; 
            return ;  
        }
        const isValidEmail= validateEmail(senderMail) ; 
        if(!isValidEmail ){
            setBorderStyle("2px solid red")
            return ; 
        }else{
            setBorderStyle("")
        }
        if(  !senderFeedBack){
            setFeedBackBorderStyle("2px solid red") ; 
            return ; 
        }else{
            setFeedBackBorderStyle("") ; 
        }
    
        emailjs
          .send('service_5lzzsnw', 'template_0ddffiv',  {
            to_email: 'gecbhavce2021@gmail.com',
            from_name: senderMail,
            message: senderFeedBack ,
          }, {
            publicKey: 'P9h4aZpSbHIvVur_r',
          })
          .then(
            () => {
            setBlack( false ) ; 
            setSendFeedBack( false )  ; 
            toast.success("Your valuable response has been send successfully !!") ; 
            },
            (error) => {
                setBlack( false  ) ; 
                setSendFeedBack( false )  ; 
                toast.success("Your valuable response has been send successfully !!") ; 
            },
          );
          setEmailSent() ; 

      };

    return (
        <div id="_userName" style={{padding:"20px 0 " , margin:"auto" , top:"25vh" , left:"35vw"}}> 
        
          <div className="userNameDiv1">
                <img src={openBook} />
                <div>
                    <p>Welcome To</p>
                    <h1>My Bookshelf</h1>
                </div>
          </div>
        
            <input style={{border:borderStyle}}className="userEmail" placeholder="Enter Your Email" value={senderMail} onChange={e => setSenderMail(e.target.value)} />
            <textarea style={{border:feedBackBorderStyle}} className="feedback" placeholder="Enter Valuable Feedback" 
            value={senderFeedBack} onChange={e => setSenderFeedBack(e.target.value)} />
            <div className="sendEmail">
                <p onClick={()=>sendEmail()}>
                    SUBMIT
                </p>
                <img src={goalsaathi} />
            </div>
        </div>
    )
}
export default SendFeedBack ; 