import Users from "./Users/Users"
import "./Styles/style.css"
import { useContext } from "react"
import { menuContext } from "./Context/menuContext";
import { Route, Routes } from "react-router-dom";
import AddUsers from "./Users/addUsers";
import EnterScors from "./Enter scors/EnterScor";
import StudentScors from "./Enter scors/student_scors";
import Grade from "./Grade/grade";

const Content = () => {

    const {menu , setMenu} = useContext(menuContext);

    const HandleShowMenu = (e) => {
        e.stopPropagation()
        setMenu(!menu)
    }

    return(

        <div className="div_content" onClick={() => {setMenu(false)}}>

            <i className="fa fa-bars" id="menu_icon" onClick={HandleShowMenu}></i>
            
            <Routes>

                <Route path="/student" element={<Users />}/>

                <Route path="/add/student" element={<AddUsers />}>

                    <Route path=":userId" />

                </Route>

                <Route path="/enter/scor" element={<EnterScors />}/>


                <Route path={`/enter/scors/:id`} element={<StudentScors />}/>

                <Route path={"/students/grade"} element={<Grade />}/>

                {/* <Route path="*" element={<Users />}/> */}

                

            </Routes>
            
            

        
        </div>


    )


}

export default Content

