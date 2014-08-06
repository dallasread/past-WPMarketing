<div class="app" data-app="relevant_text">
	<div class="header"></div>
	
	<div class="content">
		<pre>
		function search_engine_query_string($url = false) {

		    if(!$url) {
		        $url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : false;
		    }
		    if($url == false) {
		        return '';
		    }

		    $parts = parse_url($url);
		    parse_str($parts['query'], $query);

		    $search_engines = array(
		        'bing' => 'q',
		        'google' => 'q',
		        'yahoo' => 'p'
		    );

		    preg_match('/(' . implode('|', array_keys($search_engines)) . ')\./', $parts['host'], $matches);

		    return isset($matches[1]) && isset($query[$search_engines[$matches[1]]]) ? $query[$search_engines[$matches[1]]] : '';

		}
		</pre>
	</div>
</div>