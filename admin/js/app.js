jQuery(function($) {
	window.wpMarketing = {
		apps: {
			action_bar: {
				name: "Action Bar",
				colour: "#2EA2CC"
			}, 
			pop_over: {
				name: "Pop Over",
				colour: "#C33E7D"
			},
			google_search: {
				name: "Search Text",
				colour: "#13B6A5"
			},
			digital_downloads: {
				name: "Digital Downloads",
				colour: "#946F65"
			},
			contacts: {
				name: "Contacts",
				colour: "#7A933D"
			},
			subscriptions: {
				name: "Subscriptions",
				colour: "#3A3B99"
			},
			landing_pages: {
				name: "3-Step Landing Pages",
				colour: "#AD3C2D",
				notes: "Choose a template, Add your content, Publish"
			},
			integrations: {
				name: "3rd-Party Integrations",
				colour: "#5D1625"
			},
			polls: {
				name: "Polls",
				colour: "#724C78"
			},
			surveys: {
				name: "Surveys",
				colour: "#E36E64"
			},
			contact_form: {
				name: "Contact Form",
				colour: "#19490A"
			},
			social_buttons: {
				name: "Social Buttons",
				colour: "#B6892B"
			},
			seo: {
				name: "Supercharged SEO",
				colour: "#0F6F4B"
			},
			social_posting: {
				name: "AutoSocialize",
				colour: "#5BAAC6"
			},
			call_back: {
				name: "Call Back",
				colour: "#723C99"
			},
			appointments: {
				name: "Appointment Booker",
				colour: "#297971"
			},
			live_chat: {
				name: "Live chat",
				colour: "#993066"
			},
			ads_wizard: {
				name: "Ads Wizard",
				colour: "#AD4C22"
			},
			settings: {
				name: "Settings",
				colour: "#444444"
			},
			upgrade: {
				name: "Upgrade",
				colour: "#0E8FAA"
			}
		},
	
		setApp: function (namespace) {
			var app = window.wpMarketing.apps[namespace];
			
			$(".wpmarketing .app .header h3").text(app.name);
			$(".wpmarketing .app .header").css({
				"background-color": app.colour,
				"border-color": app.colour
			});
		},
		
		init: function () {
			$(".wpmarketing .home").html("");
	
			$.each(window.wpMarketing.apps, function(namespace, app) {
				var template = $("<div class=\"app_icon\"><h3></h3></div>");
				template.attr("data-show", namespace);
				template.find("h3").text(app.name);
				template.css({
					"background-color": app.colour,
					"border-color": app.colour
				});
				template.appendTo(".wpmarketing .home");
			});
		}
	}
	
	$(document).on("click", ".wpmarketing [data-show]", function() {
		var namespace = $(this).attr("data-show");
		window.wpMarketing.setApp(namespace);
		$(".wpmarketing .home").hide();
		$(".wpmarketing .app").show();
		$("html, body").scrollTop(0);
		return false;
	});
	
	$(document).on("click", ".wpmarketing .app .go_home", function() {
		$(".wpmarketing .home").show(0);
		$(".wpmarketing .app").hide();
		$("html, body").scrollTop(0);
		return false;
	});
	
	window.wpMarketing.init();
});