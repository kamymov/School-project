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
        

        if(isset($_POST['adabiat'])){

            $id = $_POST['id'];
            $adabiat = $_POST['adabiat'];
            $arabi = $_POST['arabi'];
            $dini = $_POST['dini'];
            $englisi = $_POST['englisi'];
            $ryazi = $_POST['ryazi'];
            $fizik = $_POST['fizik'];
            $shimi = $_POST['shimi'];

            $update = "UPDATE student_scors SET adabiat='$adabiat' , arabi='$arabi' , dini='$dini' , englisi='$englisi' , ryazi='$ryazi' , fizik='$fizik' , shimi='$shimi' WHERE id='$id'";

            $update_query = mysqli_query($conn , $update);       


        }


        if(isset($_GET['EnterScors'])){

            $id = $_GET['EnterScors'];

            $select_scors = "SELECT * FROM student_scors WHERE id='$id'";

            $student_scors_query = mysqli_query($conn , $select_scors);

            if($student_scors_query){

                header("Content-Type: JSON");

                $i = 0;
                while($row = mysqli_fetch_assoc($student_scors_query)){

                    $id = $row['student_id'];

                    $select_name = "SELECT fullName FROM studentinfo WHERE id='$id'";

                    $select_name_query = mysqli_query($conn , $select_name);

                    $fullName = mysqli_fetch_assoc($select_name_query);
                    
                    $response['id'] = $row['id'];
                    $response['fullName'] = $fullName['fullName'];
                    $response['adabiat'] = $row['adabiat'];
                    $response['arabi'] = $row['arabi'];
                    $response['dini'] = $row['dini'];
                    $response['englisi'] = $row['englisi'];
                    $response['ryazi'] = $row['ryazi'];
                    $response['fizik'] = $row['fizik'];
                    $response['shimi'] = $row['shimi'];
                    $response['student_id'] = $row['student_id'];
                    $i++;


                }
                echo json_encode($response , JSON_PRETTY_PRINT);


            }


            
        }else{

            $select_scors = "SELECT * FROM student_scors";

            $student_scors_query = mysqli_query($conn , $select_scors);

            if($student_scors_query){

                header("Content-Type: JSON");

                $i = 0;
                while($row = mysqli_fetch_assoc($student_scors_query)){

                    $id = $row['student_id'];

                    $grade = round(($row['adabiat'] + $row['arabi'] + $row['dini'] + $row['englisi'] + $row['ryazi'] + $row['fizik'] + $row['shimi'])/7 , 2);

                    $select_name = "SELECT fullName FROM studentinfo WHERE id='$id'";

                    $select_name_query = mysqli_query($conn , $select_name);

                    $fullName = mysqli_fetch_assoc($select_name_query);
                    
                    $response[$i]['id'] = $row['id'];
                    $response[$i]['fullName'] = $fullName['fullName'];
                    $response[$i]['adabiat'] = $row['adabiat'];
                    $response[$i]['arabi'] = $row['arabi'];
                    $response[$i]['dini'] = $row['dini'];
                    $response[$i]['englisi'] = $row['englisi'];
                    $response[$i]['ryazi'] = $row['ryazi'];
                    $response[$i]['fizik'] = $row['fizik'];
                    $response[$i]['shimi'] = $row['shimi'];
                    $response[$i]['student_id'] = $row['student_id'];
                    $response[$i]['grade'] = $grade;
                    $i++;


                }
                echo json_encode($response , JSON_PRETTY_PRINT);


            }

        }


    }


?>