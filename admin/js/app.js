jQuery(function($) {
	window.wpMarketing = {
		apps: {
			lead_generator: {
				name: "LeadGenerator",
				description: "Call-To-Actions, Autoresponders, and Analytics in one place.",
				colour: "#0E8FAA",
				installed: true,
				premium: true,
				notes: "Pop Over, Top bar, bottom right, right middle || Digital Downloads, Subscriptions, Polls, Surveys, Contact Form, Call Back, Appointment Booker, LivelyChat"
			}, // C33E7D, , , , , , , , , 7A933D
			touch_base: {
				name: "TouchBase",
				description: "A single helpdesk to respond to all your leads and contacts.",
				colour: "#993066",
				installed: true,
				premium: true
			},
			supercharged_seo: {
				name: "Supercharged SEO",
				description: "Dynamic, fully-tailored, optimizations for best ranking results.",
				colour: "#0F6F4B",
				installed: true,
				premium: true
			},
			landing_pager: {
				name: "LandingPager",
				description: "3 Steps: Choose a template, Add your content, Publish.",
				colour: "#AD3C2D",
				installed: true,
				premium: true
			},
			easyshare_buttons: {
				name: "EasyShare Buttons",
				description: "Sharing buttons that increase your social reach.",
				colour: "#B6892B",
				installed: true,
				premium: true
			},
			relevant_text: {
				name: "RelevantText",
				description: "Display relevant content to Googlers, Bingers and Yahooers.",
				colour: "#3A3B99",
				installed: true,
				premium: true
			},
			ads_wizard: {
				name: "Ads Wizard",
				description: "Step-by-step ad writing and publishing walkthrough.",
				colour: "#AD4C22",
				installed: true,
				premium: true
			},
			integrations: {
				name: "3rd-Party Integrations",
				description: "Mailchimp, Aweber, GetResponse, Wufoo, etc.",
				colour: "#297971",
				installed: true,
				premium: true
			},
			autosocializer: {
				name: "AutoSocializer",
				description: "Automatically have new posts announced via social media.",
				colour: "#723C99",
				installed: true,
				premium: true
			},
			settings: {
				name: "Settings",
				description: "Sitewide WP Marketing options and preferences.",
				colour: "#444444",
				installed: true,
				premium: true
			},
			upgrade: {
				name: "Upgrade",
				description: "Purchase a license for full access to WP Marketing apps!",
				colour: "#5D1625",
				installed: true,
				premium: true
			}
		},
	
		setApp: function (namespace) {
			var app = window.wpMarketing.apps[namespace];

			$(".wpmarketing .home").hide();
			$(".wpmarketing .app:not([data-app='" + namespace + "'])").hide();
			$(".wpmarketing .app[data-app='" + namespace + "']").show();
			
			$(".wpmarketing .app .header").html("<a href=\"#\" class=\"go_home button\">&larr; Back to Apps</a> &nbsp;<a href=\"#\" class=\"button\" data-show=\"upgrade\">Get More Apps</a><h3></h3>");
			$(".wpmarketing .app .header h3").text(app.name);
			$(".wpmarketing .app .header").css({
				"background-color": app.colour,
				"border-color": app.colour
			});
		},
		
		init: function () {
			$(".wpmarketing .home").html("");
	
			$.each(window.wpMarketing.apps, function(namespace, app) {
				var template = $("<div class=\"app_icon\"><h3></h3><p></p></div>");
				template.attr("data-show", namespace);
				template.find("h3").text(app.name);
				template.find("p").text(app.description);
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