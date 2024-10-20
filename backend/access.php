<?php

//    $URI = end(explode("/",$_SERVER['REQUEST_URI']));
    
    $id_acervo = 0;

    if (IsSet($_POST["acervo"])){
        include_once "connect.php";

        $query = "SELECT * FROM tb_acervo;";
        $out = [];

        $result = mysqli_query($conexao, $query);
        if(is_object($result)){
            if($result->num_rows > 0){			
                while($r = mysqli_fetch_assoc($result)) {
                    if($r['url'] == $_POST["acervo"]){
                        $id_acervo = intval($r['id']);
                        $out = json_encode($r);
                    }
                }
            }
        }
    
        $conexao->close();
    }

//    print $id_acervo;
    print $out;

?>