<?php

    $serverName = "localhost";
    $userName = "root";
    $password = "";
    $db = "school";

    $conn = mysqli_connect($serverName , $userName , $password , $db);

    // $create_db = "CREATE DATABASE school";

    if(!$conn){
        die("<span style='color:red'>cannot connect</span>" . mysqli_connect_error());
    }

    // $create_student_detail_table = "CREATE TABLE studentInfo (
        
    //     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    //     fullName VARCHAR(200) ,
    //     nationalCode VARCHAR(200) ,
    //     fotherPhone VARCHAR(200) ,
    //     motherPhone VARCHAR(200) ,
    //     homePhone VARCHAR(200) ,
    //     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    // )";

    // $create_table = "CREATE TABLE student_scors (

    //     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //     adabiat VARCHAR(220),
    //     arabi VARCHAR(220),
    //     dini VARCHAR(220),
    //     englisi VARCHAR(220),
    //     ryazi VARCHAR(220),
    //     fizik VARCHAR(220),
    //     shimi VARCHAR(220),

    //     student_id INT(6) UNSIGNED,
    //     FOREIGN KEY (student_id)  REFERENCES studentinfo(id),
    //     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP


    // )";

    // $drop = "DROP TABLE test";

    // $result = mysqli_query($conn , $create_table);

    // if($result){
    //     echo "success";
    // }else{
    //     echo "cannot" . mysqli_error($conn);
    // }



?>