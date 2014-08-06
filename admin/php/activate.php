<div class="wrap wpmarketing locked" data-plugins_url="<?php echo plugins_url("wpmarketing/"); ?>">
	
	<?php require_once "header.php"; ?>
	
	<div class="main_wrapper">
		
		<div class="app" data-app="activate">
			<div class="header">
				<h3>WP Marketing Activation</h3>
			</div>
	
			<div class="content">
				<h2>Your about to boost your leads, audience, and profits!</h2>
				<p>We'll just need a little information to fully activate WP Marketing on your website.</p>
				
			  <form action="admin.php?page=wpmarketing" method="post" class="activation_form" accept-charset="utf-8">
					<?php if ($_POST) { ?>
						<p class="wpmarketing_error">You must fill in <strong>Your Name</strong> and <strong>Your Email</strong> to use WP Marketing.</p>
					<?php } ?>
					
					<div style="margin: 35px 0; ">
						<div class="field">
				      <label for="name">Your Name</label>
				      <input type="text" name="name" id="name" value="<?php echo $wpmarketing["name"]; ?>">
				    </div>

				    <div class="field">
				      <label for="email">Your Email</label>
				      <input type="text" name="email" id="email" value="<?php echo $wpmarketing["email"]; ?>">
				    </div>
					</div>

			    <div class="field">
						<input type="submit" value="Start Using WP Marketing &nbsp; &nbsp; &rarr;" class="button button-primary button-hero orange">
					</div>
			  </form>
			</div>
		</div>
		
	</div>
</div>