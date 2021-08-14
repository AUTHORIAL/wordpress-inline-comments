<?php
/** Sets up the WordPress Environment. */
require __DIR__ . '/../../../wp-load.php';

nocache_headers();
//echo "<pre>";print_r($_POST);die;
$_POST = array(
    'comment_post_ID'  => $_POST['post_id'],
    'author' => 'Arun',
    'email' => 'test@gmail.com',
	'url' => $_POST['authorUrl'],
	'comment' => $_POST['comment'],
	'comment_parent' => $_POST['sectionId'],
   
);
 $comment = wp_handle_comment_submission( wp_unslash($_POST ) );


