import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link } from "react-router-dom";
const Users = () => {

    const [student , setStudent] = useState([]);
    const [mainStudent , setMainStudent] = useState([]);

    const HanldeDeleteStudent = (id) => {

        swal({
            title: "آیا اطمینان دارید؟",
            text: "اگر دانش آموز را  پاک کنید شما قادر به برگرداندن آن نیستید!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.get(`http://localhost:80/PHP%20project/school%20project/API/student_api.php?DeleteStudent=${id}` , {
                    headers : {
                        "Content-Type" : "JSON"
                    }
                }).then(res => {
                    axios.get('http://localhost:80/PHP%20project/school%20project/API/student_api.php').then(res => {
                        
                        setStudent(res.data);
                        setMainStudent(res.data);
                    
                    })
                })
              swal("دانش آموز مورد نظر پاک شد!", {
                icon: "success",
              });
            } else {
              swal("عدم انجام عولیات توسط کاربر!");
            }
          });


    }

    const HandleSearchStudent = (e) => {

        setStudent(mainStudent.filter(f => f.fullName.includes(e.target.value)))

    }


    useEffect(() => {

        axios.get('http://localhost:80/PHP%20project/school%20project/API/student_api.php').then(res => {
                setStudent(res.data);
                setMainStudent(res.data);
        })

    } , [])

    

    
    return(

        <div>

            <h2 className="h2">لیست دانش آموزان</h2>

            <div className="div_search_users">

                <input type="search" className="input_search" placeholder="جستجوی دانش آموز..." onChange={(e) => HandleSearchStudent(e)}/>


            </div>

            {student.length ? (
                <div className="div_table_users">

                <table className="table">

                    <tr>

                        <th id="test">نام و نام خانوادگی</th>
                        <th>نام پدر</th>
                        <th>شماره دانش آموزی</th>
                        <th>کد ملی</th>
                        <th>تلفن پدر</th>
                        <th>تلفن مادر</th>
                        <th>تلفن منزل</th>
                        <th> عملیات </th>


                    </tr>

                    {student.map(u => (
                        

                        <tr key={u.id}>

                            <td>{u.fullName}</td> 
                            <td>{u.fotherName}</td>
                            <td>{u.id}</td>
                            <td>{u.nationalCode}</td>
                            <td>{u.fotherPhone}</td>
                            <td>{u.motherPhone}</td>
                            <td>{u.homePhone}</td>
                            <td>

                                <Link to={`/add/student/${u.id}`} className="fas fa-edit" id="edit_icon"></Link>
                                
                                <i className="fas fa-trash" id="delete_icon" onClick={(id) => HanldeDeleteStudent(u.id)}></i>
                                
                            </td>

                        </tr>


                    ))}

                </table>


                <br/>
                
                <br/>
                
                <br/>

            </div>

            ) : (
                <h2 className="h2">{`${student.length == 0 ? "هیچ دانش آموزی وجود ندارد...!" : "لطفا صبر کنید...!"}`}</h2>
            )}


        </div>


    )


}

export default Users


