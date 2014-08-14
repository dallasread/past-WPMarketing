<div class="wpmarketing_header">
	<h2 data-show="home">
		<img src="<?php echo plugins_url("wpmarketing/admin/imgs/logo_black.png"); ?>" class="logo">
	</h2>
	
	<p class="cta">
		<?php if (!isset($wpmarketing["unlock_code"]) || $wpmarketing["unlock_code"] == "") { ?>
			<a href="?page=wpmarketing" class="cta button button-primary button-large" data-show="upgrade">Unlock All Apps</a>
		<?php } ?>
	
		<a href="<?php echo str_replace("&nowp", "", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"); ?>&nowp" class="start_marketingfocus">Start FullScreen Mode</a>
		<a href="<?php echo str_replace("&nowp", "", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"); ?>" class="end_marketingfocus">End FullScreen Mode</a>
	</p>
	
	<div class="wpmarketing_clear"></div>

	<?php if (isset($wpmarketing["subscriber_email"]) && $wpmarketing["subscriber_email"] != "") { ?>
		<?php if ($wpmarketing["status"] != "unlocked") { ?>
			<p class="wpmarketing_warning wpmarketing_status_warning">
				<?php if ($wpmarketing["trial_end_at"] == 0) { ?>
					<span class="is_locked">
						To start your FREE 7-day WP Marketing trial, <a href="#" class="start_free_trial">it only takes 1 click</a>.
					</span>
				<?php } else if ($wpmarketing["trial_end_at"] < time()) { ?>
					<span class="is_locked">
						Your free trial is expired. <a href="#" data-show-upgrade>Click here to upgrade.</a>
					</span>
				<?php } ?>
		
				<span class="is_trialing">
					Your FREE trial expires in: <strong><?php
						if ($wpmarketing["status"] == "trialing") {
							echo round(($wpmarketing["trial_end_at"] - time()) / 24 / 60 / 60);
						} else {
							echo 7;
						}
					?> days</strong>. After that, some features will be hidden unless you upgrade (<a href="#" data-show-upgrade>click here to upgrade</a>).
				</span>
			</p>
		<?php } ?>
	<?php } ?>
	
	<div class="wpmarketing_clear"></div>
</div>