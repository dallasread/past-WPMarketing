<!DOCTYPE html>
<html>
	<head>
		<title><?php the_title(); ?></title>
		<?php wp_head(); ?>
		<style type="text/css" media="screen">
			.landing_pager {
				background: red;
			}
		</style>
	</head>
	<body class="landing_pager">
		<p>
			BOOM!
		</p>
		<?php wp_footer(); ?>
	</body>
</html>
