import axios from "axios"
import { useEffect, useState } from "react"

const Grade = () => {

    const [StudentGrade , setStudentGrade] = useState([]);
    const [mainStudentGrade , setMainStudentGrade] = useState([]);

    const HandleSearchStudent = (e) => {

        setStudentGrade(mainStudentGrade.filter(t => t.fullName.includes(e.target.value)))

    }


    useEffect(() => {

        axios.get('http://localhost:80/PHP%20project/school%20project/API/student_scors_api.php?').then(res => {
            
            setStudentGrade(res.data);
            setMainStudentGrade(res.data);

        })

    } , [])

    return(

        <>

            <div className="div_grade">

                <h2 className="h2">معدل</h2>

                <input type="search" onChange={(e) => {HandleSearchStudent(e)}} style={{"marginBottom" : "25px"}} className="input_search_scors" placeholder="جستجوی دانش آموز..."/>

                <div className="div_table">

                    

                        <table className="table">

                            {StudentGrade ? (

                               <>

                                    <tr>

                                        <th>شماره دانشجویی</th>
                                        <th>نام و نامه خانوادگی</th>
                                        <th>ادبیات</th>
                                        <th>عربی</th>
                                        <th>دینی</th>
                                        <th>انگلیسی</th>
                                        <th>ریاضی</th>
                                        <th>فیزیک</th>
                                        <th>شیمی</th>
                                        <th>معدل</th>

                                    </tr>

                                    
                                    {StudentGrade.map(u => (

                                        <tr key={u.id}>

                                            <td style={{"color" : "black"}}>{u.student_id}</td>
                                                <td>{u.fullName}</td>
                                                <td>{u.adabiat}</td>
                                                <td>{u.arabi}</td>
                                                <td>{u.dini}</td>
                                                <td>{u.ryazi}</td>
                                                <td>{u.ryazi}</td>
                                                <td>{u.fizik}</td>
                                                <td>{u.shimi}</td>
                                            <td style={{"color" : "red" , "fontSize" : "15px"}}>{u.grade}</td>

                                        </tr>

                                    ))}


                                    

                                    

                                </>


                            ) : (

                                <h2 className="h2">لطفا صبر کنید...!</h2>

                            )} 

                            <tbody>
                            
                                
                                

                            
                            </tbody>



                        </table>

                   

                   


                </div>


            </div>
        
        
        </>


    )


}

export default Grade