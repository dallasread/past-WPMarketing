jQuery(function($) {
	window.SwayPage = {
		init: function() {

		},
		
		new: function() {
			tb_show("New Landing Page", "#TB_inline?height=225&width=250&inlineId=new_sway_page_thickbox", null);
		},
		
		create: function(page) {
			$.post(ajaxurl, {
				action: "create_sway_page",
				title: page.title,
				name: page.name
			}, function(response) {
				var json = JSON.parse(response);

				if (json.success == true) {
					tb_remove();
					$(".create_sway_page")[0].reset();
				} else {
					alert(page.name + " has already been taken as a permalink.")
				}
			});
		}
	}
	
	$(document).on("click", ".new_sway_page", function() {
		SwayPage.new();
		return false;
	});
	
	$(document).on("submit", ".create_sway_page", function() {
		var page = {
			title: $(this).find("[name='title']").val(),
			name: $(this).find("[name='name']").val()
		}
		SwayPage.create(page);
		return false;
	});
});