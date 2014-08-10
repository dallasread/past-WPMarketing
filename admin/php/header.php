<?php if ($wpmarketing["unlock_code"] == "") { ?>
	<a href="?page=wpmarketing" class="cta button button-primary button-large" data-show="upgrade">Unlock All Apps</a>
<?php } else { ?>
	<p class="cta">Welcome back!</p>
<?php } ?>

<h2>
	<img src="<?php echo plugins_url("wpmarketing/admin/imgs/logo_black.png"); ?>" class="logo">
</h2>