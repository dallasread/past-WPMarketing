<div class="app" data-app="sway_page">
	<div class="header"></div>
	
	<div class="content no_padding">
		<div class="topbar">
			<div class="left_of_topbar">
				<select>
					<option>Choose A Page...</option>
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
				<a href="#" class="button new_sway_page">New Landing Page</a>
			</div>
			
			<div class="right_of_topbar">
				<!--<a href="#" class="button ">View Stats</a>
					<a href="#" class="button ">AB Testing</a>
					<a href="#" class="button ">View Submissions</a>
					<a href="#" class="button ">Duplicate</a>-->
				<a href="#" class="button ">Page Settings</a>
				<a href="#" class="button ">Save Changes</a>
				<a href="#" class="button">Preview</a>
				<a href="#" class="button">Unpublish</a>
				<a href="#" class="button button-primary">Publish</a>
			</div>
			
			<div class="wpmarketing_clear"></div>
		</div>
		
		<div class="wpmarketing_clear"></div>
		
		<div class="app_panes with_sidebar">
			
			<div class="sidebar">
				<ul class="widgets">
					<li><a href="#">Form</a></li>
					<li><a href="#">Checklist</a></li>
					<li><a href="#">Single Testimonial</a></li>
					<li><a href="#">Two Testimonials</a></li>
					<li><a href="#">Three Testimonials</a></li>
					<li><a href="#">Testimonials Slider</a></li>
					<li><a href="#">Image Slider</a></li>
					<li><a href="#">Image</a></li>
					<li><a href="#">Button</a></li>
					<li><a href="#">Video</a></li>
					<li><a href="#">Pricing Table</a></li>
					<li><a href="#">FAQ</a></li>
				</ul>
			</div>
			
			<div class="pane">
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