<script>
	window.ConvertAlert || (window.ConvertAlert = []);
	
	jQuery.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
	};
	
	ConvertAlert.page = {
		url: "<?php echo WPMarketing::request_path(); ?>",
		title: document.title
	};
	
	ConvertAlert.push(["mode", "post"]);
	ConvertAlert.push(["url", "<?php echo admin_url("admin-ajax.php"); ?>"]);
	ConvertAlert.push(["track", {
	  description: "{{ visitor.name }} visited {{ page.title }}.",
	  verb: "visit",
		page: ConvertAlert.page
	}]);
	
	jQuery('form').on("submit", function(e) {
		ConvertAlert.push(["track", {
		  description: "{{ visitor.name }} submitted a form at <a href=\"{{ page.url }}\">{{ page.title }}</a>.",
		  verb: "submit",
			page: ConvertAlert.page,
			form: jQuery(this).serializeObject()
		}]);
	});

	
  (function() {
    var ca = document.createElement("script"); ca.type = "text/javascript";
		ca.async = true;  ca.src = "<?php echo plugins_url("/wpmarketing/public/js/apps/convert_alert.js"); ?>";
		var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ca, s);
  })();
</script>