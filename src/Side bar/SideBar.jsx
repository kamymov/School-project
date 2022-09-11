import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { menuContext } from "../Context/menuContext"

const SideBar = () => {

    const {menu , setMenu} = useContext(menuContext)

    return(

        <div className="div_side_bar" style={{"right" : `${menu ? "0" : "-210px"}`}}>

            

            <NavLink style={({isActive}) => {return isActive ? {backgroundColor : "black" , color : "white"} : {}}} to="/student" className="a_menu">لیست دانش آموزان</NavLink>
            <NavLink style={({isActive}) => {return isActive ? {backgroundColor : "black" , color : "white"} : {}}} to="/add/student" className="a_menu">ثبت نام دانش آموز</NavLink>
            <NavLink style={({isActive}) => {return isActive ? {backgroundColor : "black" , color : "white"} : {}}} to="/enter/scor" className="a_menu">وارد کردن نمرات</NavLink>
            <NavLink style={({isActive}) => {return isActive ? {backgroundColor : "black" , color : "white"} : {}}} to="/students/grade" className="a_menu">معدل دانش آموزان</NavLink>



        </div>
    )



}

export default SideBar