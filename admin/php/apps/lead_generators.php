<div class="app" data-app="lead_generators">
	<div class="header"></div>
	
	<div class="content no_padding">
		<div class="topbar">
			<div class="left_of_topbar">
				<select>
					<option>Choose A Lead Generator...</option>
					<?php
					
						$sway_pages = get_posts(array(
							"posts_per_page"   => -1,
							"orderby"          => "title",
							"order"            => "ASC",
							"post_type"        => "sway_page",
							"post_status"      => "any"
						));
						
						foreach ($sway_pages as &$sway_page) {
							echo "<option value=\"" . $sway_page->ID. "\">" . $sway_page->post_title . "</option>";
						}
						
					?>
				</select> &nbsp; &nbsp; 
				<a href="#" class="button new_sway_page">New Lead Generator</a>
			</div>
			
			<div class="right_of_topbar">
				<!--<a href="#" class="button ">View Stats</a>
					<a href="#" class="button ">AB Testing</a>
					<a href="#" class="button ">Reponses</a>
					<a href="#" class="button ">Duplicate</a>-->
				<a href="#" class="button ">Settings</a>
				<a href="#" class="button ">Save Changes</a>
				<a href="#" class="button">Unpublish</a>
				<a href="#" class="button button-primary">Publish</a>
			</div>
			
			<div class="wpmarketing_clear"></div>
		</div>
		
		<div class="wpmarketing_clear"></div>
		
		<div class="app_panes">
			
			<div class="pane">
				This is the editor
			</div>
			
		</div>

	</div>
</div>