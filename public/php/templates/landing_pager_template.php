<!DOCTYPE html>
<html>
	<head>
		<title><?php the_title(); ?></title>
		<?php wp_head(); ?>
		<style type="text/css" media="screen">
			.sway_page {
				background: red;
			}
		</style>
	</head>
	<body class="sway_page">
		<p>
			BOOM!
		</p>
		<?php wp_footer(); ?>
	</body>
</html>
