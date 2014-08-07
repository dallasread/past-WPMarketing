<div class="wrap wpmarketing <?php if ($wpmarketing["unlock_code"] != "") { echo "un"; } ?>locked" data-plugins_url="<?php echo plugins_url("wpmarketing/"); ?>" data-unlock_code="<?php echo $wpmarketing["unlock_code"]; ?>">
	
	<?php require_once "header.php"; ?>
	
	<div class="main_wrapper">
		<div class="home">
			Javascript must be enabled to use WP Marketing apps.
		</div>
		
		<?php
			require_once("apps/live_tracker.php");
			require_once("apps/lead_generator.php");
			require_once("apps/touch_base.php");
			require_once("apps/supercharged_seo.php");
			require_once("apps/landing_pager.php");
			require_once("apps/easyshare_buttons.php");
			require_once("apps/relevant_text.php");
			require_once("apps/ads_wizard.php");
			require_once("apps/integrations.php");
			require_once("apps/autosocializer.php");
			require_once("apps/settings.php");
			require_once("apps/upgrade.php");
		?>
	</div>
</div>