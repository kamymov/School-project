<?php

    function cors() {
        
        if (isset($_SERVER['HTTP_ORIGIN'])) {

            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
            exit(0);
        }
        
    }

    cors();
    
    
    $_POST = json_decode(file_get_contents('php://input'), true);
    // $_GET = json_decode(file_get_contents('php://input'), true);

    
    $serverName = "localhost";
    $userName = "root";
    $password = "";
    $db = "school";

    $conn = mysqli_connect($serverName , $userName , $password , $db);

    $response = array();

    if(!$conn){
        die("<span style='color:red'>Cannot</span>" . mysqli_connect_error());
    }else{

        if(isset($_POST['fullName'])){

            if($_POST['id'] == ""){

                $full_name = $_POST['fullName'];
                $fother_name = $_POST['fotherName'];
                $national_code = $_POST['nationalCode'];
                $fother_phone = $_POST['fotherPhone'];
                $mother_phone = $_POST['motherPhone'];
                $home_phone = $_POST['homePhone'];

                $insert_data = "INSERT INTO studentinfo (fullName , fotherName , nationalCode , fotherPhone , motherPhone , homePhone) VALUES ('$full_name', '$fother_name ,'$national_code','$fother_phone','$mother_phone' , '$home_phone')";

                $result = mysqli_query($conn , $insert_data);

                if($result){

                    $select_id = "SELECT * FROM studentinfo WHERE fullName='$full_name'";

                    $select_id_query = mysqli_query($conn , $select_id);

                    while($row = mysqli_fetch_assoc($select_id_query)){

                        $id = $row['id'];

                        $insert_scors = "INSERT INTO student_scors (adabiat,arabi,dini,englisi,ryazi,fizik,shimi,student_id) VALUES ('','','','','','','','$id')";

                        mysqli_query($conn , $insert_scors);
                    }


                }


            }else{

                $id = $_POST['id'];
                $full_name = $_POST['fullName'];
                $fother_name = $_POST['fotherName'];
                $national_code = $_POST['nationalCode'];
                $fother_phone = $_POST['fotherPhone'];
                $mother_phone = $_POST['motherPhone'];
                $home_phone = $_POST['homePhone'];
    
                $Update_data = "UPDATE studentinfo SET fullName='$full_name' , fotherName='$fother_name' , nationalCode='$national_code' , fotherPhone='$fother_phone' , motherPhone='$mother_phone' , homePhone='$home_phone' WHERE id='$id'";

                mysqli_query($conn , $Update_data);
                

            }
        }




        if(isset($_GET['DeleteStudent'])){
            
            $delete = $_GET['DeleteStudent'];
            
            $del = "DELETE FROM student_scors WHERE student_id='$delete'";

            $result = mysqli_query($conn , $del);

            if($result){

                $del_student = "DELETE FROM studentinfo WHERE id='$delete'";

                mysqli_query($conn , $del_student);
            }
        }

        if(isset($_GET['EditStudent'])){

            $edit_id = $_GET['EditStudent'];

            $edit = "SELECT * FROM studentinfo WHERE id='$edit_id'";

            $result = mysqli_query($conn , $edit);

            if($result){
                header("Content-Type: JSON");
                $i = 0;
                while($row = mysqli_fetch_assoc($result)){
    
                    $response['id'] = $row['id'];
                    $response['fullName'] = $row['fullName'];
                    $response['fotherName'] = $row['fotherName'];
                    $response['nationalCode'] = $row['nationalCode'];
                    $response['fotherPhone'] = $row['fotherPhone'];
                    $response['motherPhone'] = $row['motherPhone'];
                    $response['homePhone'] = $row['homePhone'];
                    $i++;
    
                }
                echo json_encode($response , JSON_PRETTY_PRINT);
    
    
            }
        }else{
            $select_data = "SELECT * FROM studentinfo";

            $select_data_query = mysqli_query($conn , $select_data);
            
            if($select_data_query){

                header("Content-Type: JSON");
                $i = 0;
                while($row = mysqli_fetch_assoc($select_data_query)){

                    $response[$i]['id'] = $row['id'];
                    $response[$i]['fullName'] = $row['fullName'];
                    $response[$i]['fotherName'] = $row['fotherName'];
                    $response[$i]['nationalCode'] = $row['nationalCode'];
                    $response[$i]['fotherPhone'] = $row['fotherPhone'];
                    $response[$i]['motherPhone'] = $row['motherPhone'];
                    $response[$i]['homePhone'] = $row['homePhone'];
                    $i++;

                }
                echo json_encode($response , JSON_PRETTY_PRINT);


            }
        }

        



    }






?>