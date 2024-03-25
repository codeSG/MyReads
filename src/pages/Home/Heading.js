// import "../../style/BetterFile.css";
import "../../css/Heading.css"
import openBook from "../../assets/openBook.png" ; 
import { Search } from 'lucide-react'; ; 


const Heading = ( { searchFilter} )=>{

    return (


<div id="heading">
              <div id="topBar" >
                <img src={openBook} />
                


                <label>My Bookshelf</label>
              </div>
                
                <div id="search" >
                    <input id="searchInput" placeholder="Search"
                    onChange={  (e)=>{  searchFilter(e.target.value ) ;  }} />
                    {/* <i id="font" className='bx bx-search-alt-2'></i>  */}
                    <Search id="font" />
    
                </div>
            </div>



    )



}

export default Heading ; 