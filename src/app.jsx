import SideBar from "./Side bar/SideBar"
import Users from "./Users/Users"
import "./Styles/style.css"
import Content from "./content"
import { useState } from "react"
import { menuContext } from "./Context/menuContext"
import { BrowserRouter } from "react-router-dom"

const App = () => {

  const [menu , setMenu] = useState(false);

    return(

        <div className="app_div">

          <BrowserRouter> 

            <menuContext.Provider value={{menu , setMenu}}>

                <SideBar />

                <Content />

            </menuContext.Provider>

          </BrowserRouter>

        </div>

    )

}

export default App