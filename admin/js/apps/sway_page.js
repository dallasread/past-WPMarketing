jQuery(function($) {
	app = $(".app[data-app='sway_page']");
	
	window.SwayPage = {
		default_widget_data: {
			title: {
				content: "If you were given $250,000 to spend, isn't this the Wordpress marketing tool you would build?"
			},
			subtitle: {
				content: "I looked everywhere, but wasn't able to find an EASY, AFFORDABLE, ALL-IN-ONE marketing tool for Wordpress. So, I built it."
			},
			checklist: {
				title: "Here is what you'll find when you install WP Marketing:",
				items: [{
					heading: "What is the answer to life?",
					description: "42"
				}, {
					heading: "Are refunds provided?",
					description: "Yes."
				}]
			},
			testimonials: {
				title: "Here's what people are saying about WP Marketing:",
				testimonials: [{
					byline: "Anonymous",
					content: "First of all, like other folks who have already commented, Dallas (the developer) is responsive and helpful, the setup easy was and keeping all of the plugin's configuration and data stored in the local site make this plugin shine above all other site chat plugins for WP. The caching feature in v1.0.11 shows great promise. Thanks so much and looking forward to seeing this work evolve."
				}, {
					byline: "Anonymous",
					content: "Thanks for the plug in, out of the alternatives this has everything needed and is just after a couple of clicks ready to run. Well done!"
				}, {
					byline: "Anonymous",
					content: "Dallas has done a amazing job putting this together and supporting it."
				}, {
					byline: "Anonymous",
					content: "I had a minor problem and Dallas stayed on top of it to make it work."
				}, {
					byline: "Anonymous",
					content: "I have used this plugin in several websites and it never disappoints."
				}, {
					byline: "Anonymous",
					content: "Thank you Dallas for fixing my website problem..... All better now !!!"
				}, {
					byline: "Anonymous",
					content: "One of the best plugin I have ever seen!!!"
				}, {
					byline: "Anonymous",
					content: "Really simple setup and use! Just awesome! Thank you Dallas!"
				}, {
					byline: "Anonymous",
					content: "Thanks a million buddy ...... worked out great!"
				}]
			},
			faqs: {
				title: "Frequently Asked Questions",
				faqs: [{
					question: "What is the answer to life?",
					answer: "42"
				}, {
					question: "Are refunds provided?",
					answer: "Yes."
				}]
			}
		},
	
		init: function() {
			if ($(".sway_page_select").val() == "") {
				app.removeClass("loading").removeClass("not_found").addClass("empty");
			}
		},
		
		addWidget: function(data) {
			var template = $("#wpmarketing_sway_page_" + data.type + "_template").html();
			var html = Mustache.render(template, data);
			$(html).appendTo(".editor");
			$(".editor").sortable({
				items: ".widget",
				handle: ".move_widget"
			})
		},
		
		show: function(id) {
			id = parseInt(id);
			app.addClass("loading").removeClass("empty").removeClass("not_found");
			app.find(".settings").hide();
			$(".sway_page_select").val(id);
			
			$.post(ajaxurl, {
				action: "sway_page_show",
				id: id
			}, function(response) {
				var json = JSON.parse(response);
				$(".app[data-app='sway_page']").removeClass("loading");

				if (json.success == true) {
					app.find(".show_preview").attr("href", 	(json.guid.replace("#038;", "")) + "&preview=true");
					app.find(".settings [name='post_title']").val(json.post_title);
					app.find(".settings [name='post_name']").val(json.post_name);
					app.find(".settings [name='description']").val(json.post_content.description);
					app.find(".settings [name='post_status']").val(json.post_status);
					
					app.find(".editor").html("");
					
					json.post_content.widgets.forEach(function(widget) {
						window.SwayPage.addWidget(widget);
					});
				} else {
					app.addClass("not_found");
					$(".sway_page_select").val("");
				}
			});
		},
		
		new: function() {
			tb_show("New Sway Page", "#TB_inline?height=225&width=250&inlineId=new_sway_page_thickbox", null);
		},
		
		create: function(page) {
			$.post(ajaxurl, {
				action: "sway_page_create",
				title: page.title,
				name: page.name
			}, function(response) {
				var json = JSON.parse(response);

				if (json.success == true) {
					tb_remove();
					$(".sway_page_create")[0].reset();
					$("<option value='" + json.id + "'>" + json.post_title + "</option>").insertAfter(".sway_page_select option:first");
					app.find(".editor").html("");
					window.location.hash = "!/apps/sway_page/" + json.id;
				} else {
					alert(page.name + " has already been taken as a permalink.")
				}
			});
		},
		
		update: function(id) {
			var widgets = [];
			
			app.find(".editor").find(".widget").each(function() {
				var widget = { type: $(this).attr("data-type") };
				
				if (widget.type == "title" || widget.type == "subtitle") {
					widget.content = $(this).find("[data-content]").html();
				} else if (widget.type == "checklist") {
					widget.title = $(this).find("[data-title]").html();
					widget.items = [];
					$(this).find("[data-item]").each(function() {
						var item = {
							heading: $(this).find("[data-heading]").html(),
							description: $(this).find("[data-description]").html()
						};
						widget.items.push(item);
					});
				} else if (widget.type == "testimonials") {
					widget.title = $(this).find("[data-title]").html();
					widget.testimonials = [];
					$(this).find("[data-testimonial]").each(function() {
						var testimonial = {
							byline: $(this).find("[data-byline]").html(),
							content: $(this).find("[data-content]").html()
						};
						widget.testimonials.push(testimonial);
					});
				} else if (widget.type == "faqs") {
					widget.title = $(this).find("[data-title]").html();
					widget.faqs = [];
					$(this).find("[data-faq]").each(function() {
						var faq = {
							question: $(this).find("[data-question]").html(),
							answer: $(this).find("[data-answer]").html()
						};
						widget.faqs.push(faq);
					});
				}
				
				widgets.push(widget);
			});
			
			var data = {
				action: "sway_page_update",
				id: id,
				post_title: app.find("[name='post_title']").val(),
				post_name: app.find("[name='post_name']").val(),
				post_status: app.find("[name='post_status']").val(),
				post_content: {
					theme: app.find("[name='theme']").val().toLowerCase(),
					color: "#000000",
					description: app.find("[name='description']").val(),
					widgets: widgets
				}
			};
			
			$.post(ajaxurl, data, function(response) {
				var json = JSON.parse(response);

				if (json.success == true) {
				} else {
					alert("We were unable to save this SwayPage.")
				}
			});
		}
	}
	
	app.on("click", ".new_sway_page", function() {
		SwayPage.new();
		return false;
	});
	
	$(document).on("submit", ".sway_page_create", function() {
		var page = {
			title: $(this).find("[name='title']").val(),
			name: $(this).find("[name='name']").val()
		}
		SwayPage.create(page);
		return false;
	});
	
	app.on("change", ".sway_page_select", function() {
		window.location.hash = "!/apps/sway_page/" + $(this).val();
	});
	
	app.on("click", "[data-add-widget]", function() {
		var type = $(this).data("add-widget");
		var data = window.SwayPage.default_widget_data[type];
		data.type = type;
		window.SwayPage.addWidget(data);
		return false;
	});
	
	app.on("click", ".save_changes, .show_preview", function() {
		var id = $(".sway_page_select").val();
		window.SwayPage.update(id);
		$(".settings").hide(150);
		if ($(this).hasClass("save_changes")) { return false; }
	});
	
	app.on("mouseenter", ".widget", function() {
		$(".widget_meta").prependTo(this).show();
		return false;
	});
	
	app.on("mouseleave", ".widget", function() {
		$(".widget_meta").hide();
		return false;
	});
	
	app.on("click", ".delete_widget", function() {
		var wrapper = $(this).closest(".wpmarketing_theme");
		var widget = $(this).closest(".widget");
		$(".widget_meta").appendTo(wrapper);
		widget.remove();
		return false;
	});
	
	app.on("click", "[data-content], [data-byline], [data-question], [data-answer], [data-title]", function(){
		$(this).addClass("edit_in_progress");
		$("#sway_page_content_form textarea").val($(this).html());
		tb_show("Editing Content", "#TB_inline?height=425&width=450&inlineId=sway_page_content_editor", null);
	});
	
	$(document).on("submit", "#sway_page_content_form", function(){
		var html = $("#sway_page_content_form textarea").val();
		$(".edit_in_progress").html(html).removeClass("edit_in_progress");
		tb_remove();
		return false;
	});
});