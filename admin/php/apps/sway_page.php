<div class="app loading" data-app="sway_page">
	<div class="header"></div>
	
	<div class="content no_padding">
		<div class="topbar">
			<div class="left_of_topbar">
				<select class="sway_page_select">
					<option value="">Choose A Page...</option>
					<?php
				
						$sway_pages = new WP_Query(array(
						    "post_type"  => "page",  /* overrides default "post" */
						    "meta_key"   => "_wp_page_template",
						    "meta_value" => "sway_page_template.php"
						));
					
						foreach ($sway_pages->posts as &$sway_page) {
							echo "<option value=\"" . $sway_page->ID. "\">" . $sway_page->post_title . "</option>";
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
				<a href="#" class="button show_settings">Page Settings</a>
				<a href="#" class="button show_preview" target="_blank">Preview</a>
				<a href="#" class="button button-primary save_changes">Save Changes</a>
			</div>
			
			<div class="wpmarketing_clear"></div>
			
			<div class="settings">
				<div class="field">
					<label>
						Page Title<br>
						<input type="text" name="post_title">
					</label>
				</div>
				<div class="field">
					<label>
						Permalink<br>
						<input type="text" name="post_name">
					</label>
				</div>
				<div class="field">
					<label>
						Description<br>
						<input type="text" name="description">
					</label>
				</div>
				<div class="field">
					<label>
						Theme<br>
						<select name="theme">
							<option>Castle</option>
						</select>
					</label>
				</div>
				<div class="field">
					<label>
						Status<br>
						<select name="post_status">
							<option value="draft">Draft</option>
							<option value="publish">Published</option>
						</select>
					</label>
				</div>
				<div class="field">
					<a href="#" class="button button-primary save_changes">Save Changes</a> &nbsp; 
					<a href="#" class="show_settings unaction">Cancel</a>
				</div>
			</div>
		</div>
		
		<div class="wpmarketing_clear"></div>
		
		<div class="app_panes with_sidebar">
			
			<div class="not_found wpmarketing_hold_place">
				This SwayPage could not be found.
			</div>
			
			<div class="loading wpmarketing_hold_place">
				<img src="<?php echo plugins_url("wpmarketing/admin/imgs/loading.gif"); ?>">
			</div>
			
			<div class="empty wpmarketing_hold_place">
				<p>
					Choose a page from the list or <a href="#" class="new_sway_page">create a new one</a>.
				</p>
			</div>
			
			<div class="not_loading">
				<div class="sidebar">
					<ul class="widgets">
						<li class="separator">Click to Add:</li>
						<li><a href="#" data-add-widget="title">Title</a></li>
						<li><a href="#" data-add-widget="subtitle">Subtitle</a></li>
						<li><a href="#" data-add-widget="checklist">Checklist</a></li>
						<li><a href="#" data-add-widget="testimonials">Testimonials</a></li>
						<li><a href="#" data-add-widget="form">Form (Download Now)</a></li>
						<li><a href="#" data-add-widget="images">Image Slider</a></li>
						<li><a href="#" data-add-widget="button">Button</a></li>
						<li><a href="#" data-add-widget="video">Video</a></li>
						<!--<li><a href="#" data-add-widget="pricing">Pricing Table</a></li>-->
						<li><a href="#" data-add-widget="faqs">FAQ</a></li>
					</ul>
				</div>
			
				<div class="pane">
					<div class="wpmarketing_reset">
						<div class="wpmarketing_theme" data-theme="castle">
							<div class="editor wpmarketing_theme_drop"></div>
							<div class="widget_meta">
								<a href="#" class="move_widget">Move</a>
								<a href="#" class="delete_widget">Delete</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>

	</div>
</div>

<div style="display: none; ">
	<div id="new_sway_page_thickbox">
		<form class="sway_page_create">
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
	
	<div id="sway_page_content_editor">
		<form id="sway_page_content_form">
			<textarea></textarea>
			<div class="field">
				<input type="submit" value="Save Content" class="button button-primary">
			</div>
		</form>
	</div>
</div>

<?php

	$sway_page_templates = array("title", "subtitle", "checklist", "testimonials", "faqs");
	foreach ($sway_page_templates as $widget) {
		echo "<script id=\"wpmarketing_sway_page_" . $widget . "_template\" type=\"x-tmpl-mustache\">";
		echo $mustache->getLoader()->load($widget);
		echo "</script>";
	}

?>