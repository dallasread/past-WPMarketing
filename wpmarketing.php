<?php

/*

Plugin Name: WP Marketing
Plugin URI: http://WPMarketing.guru
Description: Tools to help you market your website
Version: 1.0
Contributors: dallas22ca
Author: Dallas Read
Author URI: http://www.DallasRead.com
Text Domain: wpmarketing
Tags: marketing, customer support, customer service
Requires at least: 3.9.1
Tested up to: 3.9.1
Stable tag: trunk
License: MIT

Copyright (c) 2013 Dallas Read.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

class WPMarketing
{
  public static $wpmarketing_instance;

  public static function init() {
    if ( is_null( self::$wpmarketing_instance ) ) { self::$wpmarketing_instance = new WPMarketing(); }
    return self::$wpmarketing_instance;
  }

  private function __construct() {
    add_action( "admin_menu", array( $this, "menu_page" ) );
		add_action( "admin_init", array( $this, "admin_footer" ) );
    register_uninstall_hook( __FILE__, array( $this, "uninstall" ) );
  }
  
  public static function menu_page() {
    add_menu_page( "WP Marketing Guru", "Marketing", 7, "wpmarketing", array("WPMarketing", "admin_panel"), "", 25 );
  }
	
	public static function php() {
		return array( "welcome", "purchase" );
	}
  
  public static function admin_panel() {
		global $wpmarketing;
    WPMarketing::parse_params();
    $wpmarketing = WPMarketing::settings();
		
		if (!isset($_GET["tab"]) || !in_array($_GET["tab"], WPMarketing::php())) { 
			$_GET["tab"] = "welcome";
		}
		
		if ($wpmarketing["activated"]) {
			require_once "admin/php/activate.php";
		} else {
			require_once "admin/php/welcome.php";
		}
  }
	
	public static function admin_footer() {
		wp_register_style( "wpmarketing_style", plugins_url("admin/css/style.css", __FILE__) );
		wp_enqueue_style( "wpmarketing_style" );

		wp_register_script( "wpmarketing_script", plugins_url("admin/js/app.js", __FILE__) );
		wp_enqueue_script( "wpmarketing_script", array( "jquery" ) );
	}
  
  public static function uninstall() {
    delete_option("wpmarketing_settings");
  }
  
  public static function settings($update = false) {
		global $wpmarketing;
		
    $defaults = array(
      "version" => 0,
      "db_version" => 0,
      "activation_code" => "",
      "subscriber_name" => "",
      "subscriber_email" => "",
			"activated" => false
    );
		
    if (empty($wpmarketing)) {
	    $settings_json = json_decode( get_option("wpmarketing_settings", array()), true );
			$wpmarketing = array_merge($defaults, $settings_json);
			
			if ($wpmarketing != $settings_json || $update) {
				if ($update) { $wpmarketing = array_merge($wpmarketing, $update); }
	      $settings_json = update_option("wpmarketing_settings", json_encode($wpmarketing));
	    }
    }
				
    return $wpmarketing;
  }
  
  public static function parse_params() {
    // if (isset($_POST["email"]) && is_email($_POST["email"])) { update_option("wpmarketing_email", sanitize_email($_POST["email"])); }
    // if (isset($_POST["name"])) { update_option("wpmarketing_name", trim($_POST["name"])); } 
    // if (isset($_POST["website"])) { update_option("wpmarketing_website", $_POST["website"]); }
    // if (isset($_GET["active"])) { update_option("wpmarketing_active", $_GET["active"]); }
    // if (isset($_POST["api_key"])) {
    //   update_option("wpmarketing_api_key", $_POST["api_key"]); 
    //   update_option("wpmarketing_active", "1");
    //   
    //   if (get_option("wpmarketing_activated_at")) {
    //     update_option("wpmarketing_activated_at", time());
    //   }
    // }
  }
  
  public static function footer() {
    // $wpmarketing = WPMarketing::settings();
    // 
    // if ($wpmarketing["active"]) {
    //   $wpmarketing_keys = array("api_key", "debug", "stylesheet");
    //   $wpmarketing_options = "";
    //   
    //   foreach ($wpmarketing as $key => $value) {
    //     if (in_array($key, $wpmarketing_keys) && !!$value) {
    //       $wpmarketing_options .= " data-" . $key . "=\"" . $value . "\"";
    //     }
    //   }
    // 
    //   echo "<script src=\"" . plugins_url() . "/wpmarketing/WPMarketing.guru/tmp/0.0.1/WPMarketing-0.0.1.js\" id=\"cobrowser\"" . $wpmarketing_options . "></script>";
    // }
  }
  
  public static function folder() {
    return dirname(__FILE__);
  }
}

// WPMarketing::uninstall();
WPMarketing::init();

?>
