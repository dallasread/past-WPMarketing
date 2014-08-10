<div class="app" data-app="lead_generators">
	<div class="header"></div>
	
	<div class="content no_padding">
		<div class="topbar">
			<div class="left_of_topbar">
				<select>
					<option>Choose A Lead Generator...</option>
					<?php
					
						$landing_pages = get_posts(array(
							"posts_per_page"   => -1,
							"orderby"          => "title",
							"order"            => "ASC",
							"post_type"        => "landing_page",
							"post_status"      => "any"
						));
						
						foreach ($landing_pages as &$landing_page) {
							echo "<option value=\"" . $landing_page->ID. "\">" . $landing_page->post_title . "</option>";
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

<div style="display: none; ">
	<div id="new_sway_page_thickbox">
		<form class="create_sway_page">
			<div class="field">
				<label>
					Landing Page Name:<br>
					<input type="text" name="title">
				</label>
			</div>
			
			<div class="field">
				<label>
					Permalink:<br>
					<input type="text" name="name">
				</label>
			</div>
	
			<div class="field">
				<input type="submit" value="Start Customizing &nbsp; &rarr;" class="button button-hero button-primary orange">
			</div>
		</form>
	</div>
</div>