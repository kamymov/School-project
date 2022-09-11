import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import swal from "sweetalert";

const AddUsers = () => {

    const {userId} = useParams();

    const navigate = useNavigate();

    const [data , setData] = useState({
        fullName : "",
        fotherName : "",
        nationalCode : "",
        fotherPhone : "",
        motherPhone : "",
        homePhone : "",
        id : "",
    })


    const HandleAddStudent = (e) => {
        e.preventDefault();
        if(userId){
            axios.post('http://localhost/PHP%20project/school%20project/API/student_api.php' , data , {
                headers:{
                    "Content-Type" : "JSON"
                }
            }).then(res => {
                navigate("/student")
                swal("عملیات موفقیت آمیز!", "ویرایش کاربر با موفقیت انجام شد!", "success");
            })
        }else{
            axios.post('http://localhost/PHP%20project/school%20project/API/student_api.php' , data , {
            headers:{
                'Content-Type' : 'JSON'
            }
        }).then(res => {
            if(res.status == 200){
                navigate("/student")
                swal("عملیات موفقیت آمیز!", "اضافه کردن کاربر با موفقیت انجام شد!", "success");
            }
        }).catch(err => {
            console.log(err)
        })
        }
    }

    useEffect(() => {

        if(userId){

            axios.get(`http://localhost/PHP%20project/school%20project/API/student_api.php?EditStudent=${userId}` , {
                headers : {
                    "Content-Type" : "JSON"
                }
            }).then(res => {

                setData({
                    fullName : res.data.fullName,
                    fotherName : res.data.fotherName,
                    nationalCode : res.data.nationalCode,
                    fotherPhone : res.data.fotherPhone,
                    motherPhone : res.data.motherPhone,
                    homePhone : res.data.homePhone,
                    id : res.data.id
                })
                
            })


        }



    } , [])

    return(

        <>

            <h2 className="h2">{`${userId ? "ویرایش دانش آموز" : "ثبت نام داش آموز"}`}</h2>

            <div className="div_add_user">

                <form onSubmit={HandleAddStudent}>

                    <label htmlFor="full_name" className="input_label">نام و نام خانوادگی : </label>
                    <input name="full_name" type="text" className="input_add_users" autoComplete="off" placeholder="نام و نام خانوادگی..." value={data.fullName} onChange={(e) => setData({...data , fullName : e.target.value})}/>
                    
                    <label htmlFor="full_name" className="input_label">نام پدر : </label>
                    <input name="full_name" type="text" className="input_add_users" autoComplete="off" placeholder="نام پدر..." value={data.fotherName} onChange={(e) => setData({...data , fotherName : e.target.value})}/>
                    
                    <label htmlFor="national_code" className="input_label">کد ملی : </label>
                    <input name="national_code" type="text" className="input_add_users" autoComplete="off" placeholder="کدملی..." value={data.nationalCode} onChange={(e) => setData({...data , nationalCode:e.target.value})}/>
                    
                    <label htmlFor="fother_phone" className="input_label">شماره تماس پدر : </label>
                    <input name="fother_phone" type="text" className="input_add_users" autoComplete="off" placeholder="تلفن پدر..." value={data.fotherPhone} onChange={(e) => setData({...data , fotherPhone : e.target.value})}/>
                    
                    <label htmlFor="mother_phone" className="input_label">شماره تماس مادر : </label>
                    <input name="mother_phone" type="text" className="input_add_users" autoComplete="off" placeholder="تلفن مادر..." value={data.motherPhone} onChange={(e) => setData({...data , motherPhone:e.target.value})}/>
                    
                    <label htmlFor="home_phone" className="input_label">شماره تماس تلفن ثابت : </label>
                    <input name="home_phone" type="text" className="input_add_users" autoComplete="off" placeholder="تلفن منزل..."value={data.homePhone} onChange={(e) => setData({...data , homePhone: e.target.value})}/>

                    

                    <div style={{"direction" : "ltr" , "marginLeft" : "75px"}}>

                        <button type="submit" id="sabt_add" className="sabt_button">{`${userId ? "ویرایش" : "ثبت نام"}`}</button>

                        <Link to={(-1)} id="back_add" className="sabt_button">بازگشت</Link>

                    </div>


                </form>


            </div>

        </>



    )


}

export default AddUsers