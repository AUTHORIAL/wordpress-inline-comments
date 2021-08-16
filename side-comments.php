<?php
/**
 * Plugin Name: Authorial's Inline Comments for WordPress
 * Plugin URI: https://github.com/AUTHORIAL/wordpress-inline-comments
 * Description: An inline commenting app for wordpress installations, based on sidecomments.js (https://aroc.github.io/side-comments-demo/) and the WordPress commenting system.
 * Version: 1.0
 * Author: Authorial (authorial.co)
 */
class SideComments{

public function __construct(){
    add_action('wp_enqueue_scripts',array($this, 'themeslug_enqueue_script'),1);
   
}

public function themeslug_enqueue_script(){

    wp_enqueue_script('jquery', plugins_url().'/side-comments/js/jquery.js');
    wp_enqueue_script('side_core_js', plugins_url().'/side-comments/js/side-comments.js');
    wp_enqueue_script('test_date', plugins_url().'/side-comments/js/test_data.js');
    wp_enqueue_script('custom-js', plugins_url().'/side-comments/js/side-custom.js');

    wp_enqueue_style('side_comment_css', plugins_url().'/side-comments/css/side-comments.css');
    wp_enqueue_style('side_comments_default', plugins_url().'/side-comments/css/default-theme.css');
    wp_enqueue_style('Basis_css', plugins_url().'/side-comments/css/basics.css');
   
}


}

$Side = new SideComments();
