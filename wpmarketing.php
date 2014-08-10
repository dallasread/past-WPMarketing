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

/*
ini_set("display_errors",1);
ini_set("display_startup_errors",1);
error_reporting(-1);*/


class WPMarketing
{
  public static $wpmarketing_instance;

  public static function init() {
    if ( is_null( self::$wpmarketing_instance ) ) { self::$wpmarketing_instance = new WPMarketing(); }
    return self::$wpmarketing_instance;
  }

  private function __construct() {
		add_action( "init", array( $this, "register_post_type" ) );
    add_action( "admin_menu", array( $this, "menu_page" ) );
		add_action( "admin_init", array( $this, "admin_footer" ) );
		add_filter( "template_include", array( $this, "sway_page_template_path") );
		
		add_action( "wp_ajax_unlock", array( $this, "unlock" ) );
		add_action( "wp_ajax_create_sway_page", array( $this, "create_sway_page" ) );
		add_action( "wp_ajax_convert_alert_status", array( $this, "convert_alert_status" ) );
		add_action( "wp_ajax_convert_alert_poll", array( $this, "convert_alert_poll" ) );
		
    register_uninstall_hook( __FILE__, array( $this, "uninstall" ) );
  }
  
  public static function menu_page() {
    add_menu_page( "WP Marketing", "Marketing", 7, "wpmarketing", array("WPMarketing", "admin_panel"), "dashicons-editor-expand", 25 );
  }
	
	public static function tabs() {
		return array( "welcome", "purchase" );
	}
  
  public static function admin_panel() {
		global $wpmarketing;
		global $just_activated;
		
    WPMarketing::parse_params();
    $wpmarketing = WPMarketing::settings();
		
		if (!isset($_GET["tab"]) || !in_array($_GET["tab"], WPMarketing::tabs())) { 
			$_GET["tab"] = "welcome";
		}
		
		if ($wpmarketing["subscriber_email"] == "") {
			require_once "admin/php/activate.php";
		} else {
			require_once "admin/php/structure.php";
		}
  }
	
	public static function admin_footer() {
		wp_register_style( "wpmarketing_style", plugins_url("admin/css/style.css", __FILE__) );
		wp_enqueue_style( array( "wpmarketing_style", "thickbox" ) );

		wp_register_script( "wpmarketing_script", plugins_url("admin/js/admin.js", __FILE__) );
		wp_register_script( "mustache", plugins_url("admin/js/vendor/mustache.js", __FILE__) );
		wp_register_script( "wpmarketing_sway_page", plugins_url("admin/js/apps/sway_page.js", __FILE__) );
		wp_register_script( "wpmarketing_convert_alert", plugins_url("admin/js/apps/convert_alert.js", __FILE__) );
		
		wp_enqueue_script( array( "wpmarketing_sway_page", "wpmarketing_convert_alert", "wpmarketing_script", "mustache", "thickbox", "jquery" ) );
	}
  
  public static function uninstall() {
    delete_option("wpmarketing_settings");
  }
  
  public static function settings($update = array()) {
		global $wpmarketing;
		
    if (empty($wpmarketing) || !empty($update)) {
			$settings = get_option("wpmarketing_settings");
			if ($settings == null) { $settings = array(); }
			
	    $defaults = array(
	      "version" => 0,
	      "db_version" => 0,
				"website" => $_SERVER["SERVER_NAME"],
	      "unlock_code" => "",
	      "subscriber_name" => "",
	      "subscriber_email" => "",
				"convert_alert_status" => "on"
	    );
			
			if (!empty($update) || $wpmarketing != $settings) {
				$wpmarketing = array_merge($defaults, $settings);
				$wpmarketing = array_merge($wpmarketing, $update);
				update_option("wpmarketing_settings", $wpmarketing);
			}    
		}
				
    return $wpmarketing;
  }
	
	public static function unlock() {
		$data = array( "success" => false );
		
    if (isset($_POST["unlock_code"])) {
			$unlock_code = trim($_POST["unlock_code"]);
      $request = new WP_Http;
      $result = $request->request("http://guitarvid.com/activation/wpmarketing/unlock.php?unlock_code=" . $unlock_code);
      $response = json_decode($result["body"]);
			
			if ($response->success == 1) {
        $data = WPMarketing::settings( array( "unlock_code" => $unlock_code ) );
				$data["success"] = true;
      }
		}
		
    die(json_encode($data));
	}
  
  public static function parse_params() {
		global $wpmarketing;
		global $just_activated;
		
    if (isset($_POST["email"]) && is_email($_POST["email"]) && isset($_POST["name"])) {
			WPMarketing::settings( array(
				"subscriber_name" => trim($_POST["name"]),
				"subscriber_email" => sanitize_email(trim($_POST["email"]))
			) );
			$just_activated = true;
		}
  }
	
	/*
		Landing Pager
	*/
	
	public static function sway_page_template_path($template) {
		global $post;

		if ( !isset( $post ) ) { return $template; }
		
		if ( get_post_meta( $post->ID, "_wp_page_template", true ) == "sway_page_template.php" ) {
			$file = plugin_dir_path( __FILE__ ) . "public/php/templates/sway_page_template.php";
			if( file_exists( $file ) ) { return $file; }
		}
		
		return $template;
	}
	
	public static function create_sway_page() {
		$data = array("success" => false);
		
		$post = array(
		  "post_title"    => $_POST["title"],
			"post_name"			=> $_POST["name"],
			"post_type"			=> "landing_page",
		  "post_status"   => "draft"
		);

		$response = wp_insert_post( $post );
		
		if ($response != 0) {
			$data["id"] = $response;
			$data["success"] = true;
			update_post_meta($data["id"], "_wp_page_template", "sway_page_template.php");
		}
		
		die(json_encode($data));
	}
	
	public static function register_post_type() {
		
    $args = array(
      "labels"             => array(
	      "name"               => "Landing Pages",
	      "singular_name"      => "Landing Page"
	    ),
      "public"             => true,
      "publicly_queryable" => true,
      "show_ui"            => true, //false
      "show_in_menu"       => true, //false
      "query_var"          => "landing_page",
      "rewrite"            => false,
      "capability_type"    => "page",
      "has_archive"        => false,
      "hierarchical"       => false,
      "menu_position"      => null,
      "supports"           => array( "title", "author", "comments" )
    );
		
		
    register_post_type( "landing_page", $args );      
		add_rewrite_rule('(.+?)/', 'index.php?landing_page=$matches[1]', 'guru');
    flush_rewrite_rules();
		flush_rewrite_rules();
	}
	
	/*
		ConvertAlert
	*/
	
	public static function convert_alert_status() {
		global $wpmarketing;
		
    $data = WPMarketing::settings( array(
			"convert_alert_status" => $_POST["convert_alert_status"] == "off" ? "off" : "on",
			"success" => true
		) );
		
		die(json_encode($data));
	}
	
	public static function convert_alert_poll() {
		global $wpmarketing;
		
    $data = array();
		$dallas = array(
			"id" => 12,
			"description" => "submitted a form for adding to a company",
			"contact" => array(
				"name" => "Dallas Read",
				"avatar" => "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
				"os" => "apple",
				"browser" => "chrome",
				"country_code" => "ca",
				"latitude" => "-10",
				"longitude" => "110",
				"ip" => "0.1.2.3"
			)
		);
		$luke = array(
			"id" => 15,
			"description" => "clicked on a button",
			"contact" => array(
				"name" => "Lucky Luke",
				"avatar" => "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
				"os" => "windows",
				"browser" => "ie",
				"country_code" => "sa",
				"latitude" => "30",
				"longitude" => "10",
				"ip" => "0.1.2.3"
			)
		);
			
		array_push($data, $dallas, $luke);
		
		die(json_encode($data));
	}
}

//WPMarketing::uninstall();
WPMarketing::init();

?>
