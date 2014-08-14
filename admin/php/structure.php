<div class="wrap wpmarketing <?php echo $wpmarketing["status"]; ?>" data-plugins_url="<?php echo plugins_url("wpmarketing/"); ?>">
	<?php require_once "header.php"; ?>
	<?php require_once "remetric.php"; ?>
	
	<div class="main_wrapper">
		<div class="home">
			Javascript must be enabled to use WP Marketing apps.
		</div>
		
		<?php
			require_once("apps/convert_alert.php");
			require_once("apps/lead_generators.php");
			require_once("apps/touch_base.php");
			require_once("apps/supercharged_seo.php");
			require_once("apps/sway_page.php");
			require_once("apps/easyshare_buttons.php");
			require_once("apps/relevant_text.php");
			require_once("apps/ads_wizard.php");
			require_once("apps/integrations.php");
			require_once("apps/social_pro.php");
			require_once("apps/settings.php");
			require_once("apps/upgrade.php");
		?>
	</div>
</div>

<?php if (isset($_REQUEST["nowp"])) { ?>
	<script type="text/javascript">
		jQuery(function($) {
			$(".end_marketingfocus").show();
			$(".start_marketingfocus").hide();
			$("#wpadminbar, #adminmenuwrap, #adminmenuback, #wpfooter").hide();
			$("#wpwrap, .wrap").css("margin", 0);
			$("#wpcontent").css("margin", "-40px 0 0 0")
			$("#wpbody-content").css("padding-bottom", 0);
			$(".wrap").css("padding", "10px")
		});
	</script>
<?php } ?>