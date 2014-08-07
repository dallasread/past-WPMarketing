jQuery(function($) {
	window.LandingPager = {
		init: function() {

		},
		
		new: function() {
			tb_show("New Landing Page", "#TB_inline?height=225&width=250&inlineId=new_landing_pager_thickbox", null);
		},
		
		create: function(page) {
			$.post(ajaxurl, {
				action: "create_landing_pager",
				title: page.title,
				name: page.name
			}, function(response) {
				var json = JSON.parse(response);

				if (json.success == true) {
					tb_remove();
					$(".create_landing_pager")[0].reset();
				} else {
					alert(page.name + " has already been taken as a permalink.")
				}
			});
		}
	}
	
	$(document).on("click", ".new_landing_pager", function() {
		LandingPager.new();
		return false;
	});
	
	$(document).on("submit", ".create_landing_pager", function() {
		var page = {
			title: $(this).find("[name='title']").val(),
			name: $(this).find("[name='name']").val()
		}
		LandingPager.create(page);
		return false;
	});
});