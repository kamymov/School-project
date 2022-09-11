import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import swal from "sweetalert"

const StudentScors = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [data , setData] = useState({
        
        id : "",
        fullName : "",
        adabiat : "",
        arabi : "",
        dini : "",
        englisi : "",
        ryazi : "",
        fizik : "",
        shimi : ""


    })

    useEffect(() => {

       if(id){
        axios.get(`http://localhost:80/PHP%20project/school%20project/API/student_scors_api.php?EnterScors=${id}` , {
            headers:{
                "Content-Type" : "JSON"
            }
        }).then(res => {
            setData({

                id : res.data.id,
                fullName : res.data.fullName,
                adabiat : res.data.adabiat,
                arabi : res.data.arabi,
                dini : res.data.dini,
                englisi : res.data.englisi,
                ryazi : res.data.ryazi,
                fizik : res.data.fizik,
                shimi : res.data.shimi,

            })
        })

       }else{
        navigate(-1)
       }

    } , [])

    
    const HandleChangeScors = (e) => {
        e.preventDefault()
        axios.post("http://localhost/PHP%20project/school%20project/API/student_scors_api.php" , data , {
            headers : {
                "Content-Type" : "JSON"
            }
        }).then(res => {
            swal("عملیات موفقیت آمیز!", "تغییر نمرات با موفقیت انجام شد!", "success");
                navigate("/students/grade")
            
        })

    }

    return(

        <>

            <h2 className="h2" style={{"marginBottom" : "0px"}}>کارنامه {data.fullName}</h2>

 
            <div className="div_scors_form">

                <form onSubmit={HandleChangeScors}>
                    <div className="div_input_scors">

                        <label className="scors_table" htmlFor="adabiat">ادبیات : </label>
                        <input className="scors_input" type="text" name="adabiat" value={data.adabiat} onChange={(e) => setData({...data , adabiat : e.target.value})}/>

                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="arabi">عربی : </label>
                    <input  className="scors_input" type="text" name="arabi" value={data.arabi} onChange={(e) => setData({...data , arabi: e.target.value})}/>
                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="dini">دینی : </label>
                    <input className="scors_input" type="text" name="dini" value={data.dini} onChange={(e) => setData({...data , dini: e.target.value})}/>
                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="english">انگلیسی : </label>
                    <input className="scors_input" type="text" name="english" value={data.englisi} onChange={(e) => setData({...data , englisi : e.target.value})}/>
                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="ryazi">ریاضی : </label>
                    <input className="scors_input" type="text" name="ryazi" value={data.ryazi} onChange={(e) => setData({...data , ryazi : e.target.value})}/>
                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="fizik">فیزیک : </label>
                    <input className="scors_input" type="text" name="fizik" value={data.fizik} onChange={(e) => setData({...data , fizik : e.target.value})}/>
                    </div>

                    <div className="div_input_scors">
                    <label className="scors_table" htmlFor="shimi">شیمی : </label>
                    <input className="scors_input" type="text" name="shimi" value={data.shimi} onChange={(e) => setData({...data , shimi : e.target.value})}/>
                    </div>

                    <div className="div_button_scors">

                        <button type="submit" id="button_add_scors" className="botton_sabt_scors">ثبت نمرات</button>

                        <button id="button_back_scors" className="botton_sabt_scors"><Link style={{"textDecoration" : "none" , "color" : "white"}} to={"/student"}>بازگشت</Link></button>


                    </div>

                </form>

            </div>

        </>


    )


}

export default StudentScors