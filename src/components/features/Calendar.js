import React  , {useContext} from 'react'
import "./style/Calendar.css"
import { ContextInfo } from '../../App';

const Calendar = () => {
    const {calendarEntry} = useContext(ContextInfo) ;
    const temp = new Date() ; 
    const month = temp.getMonth() ; 
    const year = temp.getFullYear() ; 
    let numberOfDays = new Date(year, month+1, 0).getDate();
    if(!calendarEntry) return <div></div>
  return (
    <div id="dateBox">
        <p> SCHEDULED READING </p>
        <div id="date">           
          {
            calendarEntry.map( ( ele,ind)=>{
                return <>
                    <input type="checkbox" id={`checkbox${ind}`} checked={ele} />
                    <label className="checkbox-custom" for={`checkbox${ind}`}></label>

                </>
            })
          }
            
        </div>
    </div>
  )
}

export default Calendar