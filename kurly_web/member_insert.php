<?
  // 1. 데이터베이스 인증 정보 (열기 = 접속)
  // http://kiik52.dothome.co.kr/kurly/test_insert.php

  $db_sever     = 'localhost';
  $db_uesr_name = 'kiik52';
  $db_password  = 'wlwjdgh2!#';
  $db_name      = 'kiik52';
  $conn = mysqli_connect($db_sever, $db_uesr_name, $db_password, $db_name);
  mysqli_set_charset($conn, 'utf8');

  if ($conn == false) {
    die('데이터베이스 접속 실패');
  }
  else {
    echo('데이터베이스 접속 성공');
  }

  // 2. 데이터베이스에 저장 INSERT SQL 
  // 입력데이터 : 회원가입 입력상자에 입력받은 값을 저장 => AJAX를
  $id         = $_POST['input_id'];
  $pw         = $_POST['input_pw'];
  $irum       = $_POST['input_irum'];
  $email      = $_POST['input_email'];
  $hp         = $_POST['input_hp'];
  $addr       = $_POST['input_addr'];   // 주소1 + 주소2
  $gender     = $_POST['input_gender'];
  $birth      = $_POST['input_birth'];  // 생년 + 생월 + 생일
  $add_input  = $_POST['input_add_input'];
  $service    = $_POST['input_service'];
  $gaim_date  = $_POST['input_gaim_date'];

  // SQL INSERT INTO 저장할테이블이름 VALUES
  $sql = "INSERT INTO kurly_portfolio(id, pw, irum, email, hp, addr, gender, birth, add_input, service, gaim_date)
          VALUES('$id', '$pw', '$irum', '$email', '$hp', '$addr', '$gender', '$birth', '$add_input', '$service', '$gaim_date')";
  $result = mysqli_query($conn, $sql);

  // INSERT문 실행 결과 확인
  if ($result == false) {
    echo('저장 실패');
  }
  else {
    echo($irum . '저장 성공');
  }

  // 3. 데이터베이스 닫기


?>