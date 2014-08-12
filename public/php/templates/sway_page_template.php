<!DOCTYPE html>
<html>
	<head>
		<title><?php the_title(); ?></title>
		<?php wp_head(); ?>
		<style type="text/css" media="screen">
			.sway_page {
				background: #ddd;
			}
		</style>
	</head>
	<body class="sway_page wpmarketing_reset">
		<?php
			
			
			$json = stripslashes_deep(json_decode($post->post_content));
			
			foreach ($json->widgets as $widget) {
				$tpl = $mustache->loadTemplate($widget->type);
				echo $tpl->render($widget);
			}

		?>
		<?php wp_footer(); ?>
	</body>
</html>
