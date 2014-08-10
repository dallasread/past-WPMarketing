<div class="app" data-app="convert_alert">
	<div class="header"></div>
	
	<div class="content no_padding">
		<div class="topbar">
			<div class="left_of_topbar">
				<ul class="topbar_nav">
					<li><a href="#" class="selected">Events</a></li>
				</ul>
			</div>
			
			<div class="right_of_topbar">
				<a href="#" class="button button-primary button-large convert_alert_status <?php echo $wpmarketing["convert_alert_status"]; ?>">
					<span class="on_text">ConvertAlert is ON</span>
					<span class="off_text">ConvertAlert is OFF</span>
				</a>
			</div>
			
			<div class="wpmarketing_clear"></div>
		</div>
		
		<div class="app_panes with_sidebar with_wide_sidebar">
			
			<div class="sidebar">
				<ul class="newsfeed">
					<li class="loading">
						<img src="<?php echo plugins_url("wpmarketing/admin/imgs/loading.gif"); ?>"><br>
						Listening for live events.
					</li>
				</ul>
			</div>
			
			<div class="pane">
				<div id="convert_alert_map"></div>
			</div>
			
		</div>
	</div>
</div>

<script id="wpmarketing_convert_alert_event_template" type="x-tmpl-mustache">
	<li data-latitude="{{ latitude }}" data-longitude="{{ longitude }}">
		<img src="{{ contact.avatar }}" class="avatar">
	
		<div class="meta">
			<p class="description">
				<a href="#" class="show_in_thickbox" data-model="contact" data-id="{{ contact.id }}">{{ contact.name }}</a> {{ description }}.
			</p>
			<div class="profile_imgs">
				<img src="<?php echo plugins_url("wpmarketing/admin/imgs/flag/{{ contact.country_code }}.png"); ?>" class="tiny_img">
				<img src="<?php echo plugins_url("wpmarketing/admin/imgs/os/{{ contact.os }}.png"); ?>" class="tiny_img">
				<img src="<?php echo plugins_url("wpmarketing/admin/imgs/browser/{{ contact.browser }}.png"); ?>" class="tiny_img">
			</div>
		</div>
	
		<div class="wpmarketing_clear"></div>
	</li>
</script>