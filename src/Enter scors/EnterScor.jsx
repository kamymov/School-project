import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const EnterScors = () => {

    const navigate = useNavigate();

    const [studentScors , setStudentScors] = useState([]);
    const [mainStudentScors , setMainStudentScors] = useState([]);

    const HandleSearchUser = (e) => {

        setStudentScors(mainStudentScors.filter(f => f.fullName.includes(e.target.value)))


    }

    useEffect(() => {

        axios.get("http://localhost/PHP%20project/school%20project/API/student_scors_api.php").then(res => {
            setStudentScors(res.data);
            setMainStudentScors(res.data);
        })


    } , [])

    return(

        <>

            <h2 className="h2">وارد کردن نمرات</h2>
            
            <div className="div_scors_search">

                <input type="search" className="input_search_scors" onChange={(e) => HandleSearchUser(e)} placeholder="جستجوی دانش آموز..."/>


            </div>

            <div className="div_table_scors">

                {studentScors.length ? (

                    <table className="table_socrs">

                        <tr className="enter_Scor_tr">

                            <th className="th_td_scor">نام و نام خانوادگی</th>
                            <th className="th_td_scor">عملیات</th>


                        </tr>

                        {studentScors.map(u => (

                            <tr className="enter_Scor_tr" key={u.id}>

                                <td className="th_td_scor">{u.fullName}</td>

                                <td className="th_td_scor"><Link to={`/enter/scors/${u.id}`}><i  className="fas fa-edit" id="edit_icon_scors"></i></Link></td>


                            </tr>

                        ))}

                        

                    </table>

                ) : (

                    <h2>لطفا صبر کنید...!</h2>


                )}




            </div>


        </>


    )


}

export default EnterScors