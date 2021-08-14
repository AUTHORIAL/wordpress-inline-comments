<?php
require __DIR__ . '/../../../wp-load.php';

nocache_headers();
$post_id = $_POST['post_id'];
$jsArray=array();
$comments = get_comments(array(
	'post_id' => $post_id ));
foreach($comments as $comment) {
    $jsArray[]=$comment;
   
}
echo json_encode($jsArray, JSON_PRETTY_PRINT);