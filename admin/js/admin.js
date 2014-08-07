jQuery(function($) {
	window.WPMarketing = {
		plugins_url: $(".wpmarketing").data("plugins_url"),
		unlock_code: $(".wpmarketing").data("unlock_code"),
		unlocked: $(".wpmarketing").data("unlock_code") != "",
		apps: {
			landing_pager: {
				name: "LandingPager",
				description: "Only 3 Steps: Choose a template, Add content, Publish.",
				colour: "#AD3C2D",
				installed: true,
				premium: true
			},
			live_tracker: {
				name: "LiveTracker",
				description: "Find out how your visitors are interacting in real time.",
				colour: "#0E8FAA",
				installed: true,
				premium: true
			},
			touch_base: {
				name: "TouchBase",
				description: "A single helpdesk to respond to all your leads and contacts.",
				colour: "#BA3143",
				installed: false,
				premium: true,
				notes: "This should be renamed to SupportDesk, with TouchBase being reserved for followups."
			},
			lead_generator: {
				name: "LeadGenerator",
				description: "Action Bars, Pop Overs, and Widgets to boost conversions.",
				colour: "#AB6600",
				installed: false,
				premium: true,
				notes: "Pop Over, Top bar, bottom right, right middle || Digital Downloads, Subscriptions, Polls, Surveys, Contact Form, Call Back, Appointment Booker, LivelyChat"
			},
			supercharged_seo: {
				name: "Supercharged SEO",
				description: "Dynamic, tailored optimizations for #1 ranking results.",
				colour: "#0F6F4B",
				installed: false,
				premium: true
			},
			// easyshare_buttons: {
			// 	name: "EasyShare Buttons",
			// 	description: "Sharing buttons that increase your social reach.",
			// 	colour: "#B6892B",
			// 	installed: false,
			// 	premium: false
			// },
			// ads_wizard: {
			// 	name: "Ads Wizard",
			// 	description: "Step-by-step ad writing and publishing walkthrough.",
			// 	colour: "#AD4C22",
			// 	installed: false,
			// 	premium: true
			// },
			// themes: {
			// 	name: "Themes",
			// 	description: "Access to themes.",
			// 	colour: "#AD4C22",
			// 	installed: false,
			// 	premium: true
			// },
			autosocializer: {
				name: "AutoSocializer",
				description: "Automatically have new posts announced via social media.",
				colour: "#552A99",
				installed: false,
				premium: false
			},
			relevant_text: {
				name: "RelevantText",
				description: "Shortcodes to display relevant content to Googlers and Bingers.",
				colour: "#3A3B99",
				installed: false,
				premium: false
			},
			integrations: {
				name: "3rd-Party Integrations",
				description: "Mailchimp, Aweber, GetResponse, Wufoo, etc.",
				colour: "#297971",
				installed: false,
				premium: true
			},
			upgrade: {
				name: "Unlock All Apps",
				description: "Get access to all WP Marketing apps (including new ones)!",
				colour: "#5D1625",
				installed: true,
				premium: false
			},
			settings: {
				name: "Settings",
				description: "WP Marketing options and preferences across all your apps.",
				colour: "#444444",
				installed: true,
				premium: false
			}
		},
	
		setApp: function (namespace) {
			if (namespace == "home") {
				$(".wpmarketing .home").show(0);
				$(".wpmarketing .app").hide();
				$("html, body").scrollTop(0);
				window.location.hash = "!/apps/home";
			} else {
				var app = window.WPMarketing.apps[namespace];

				if (!app.installed && !window.WPMarketing.unlocked) {
					namespace = "upgrade";
					app = window.WPMarketing.apps[namespace];
				}
			
				$(".wpmarketing .home").hide();
				$(".wpmarketing .app:not([data-app='" + namespace + "'])").hide();
				$(".wpmarketing .app[data-app='" + namespace + "']").show();
	
				$(".wpmarketing .app .header").html("<a href=\"#\" class=\"go_home button\">&larr; Back to Apps</a> &nbsp;<a href=\"#\" class=\"button\" data-show=\"upgrade\">Get More Apps</a><h3></h3>");
				$(".wpmarketing .app .header h3").text(app.name);
				$(".wpmarketing .app .header").css({
					"background-color": app.colour,
					"border-color": app.colour
				});
	
				$("html, body").scrollTop(0);
			}
		},
		
		init: function () {
			$(".wpmarketing .home").html("");
	
			$.each(window.WPMarketing.apps, function(namespace, app) {
				var coming_soon = app.installed ? "" : "is_coming_soon";
				var premium = app.premium ? "" : "premium";
				var template = $("<div class=\"app_icon " + premium + " " + coming_soon + "\"><img src=\"" + window.WPMarketing.plugins_url + "admin/imgs/coming_soon.png\" class=\"coming_soon\"><h3></h3><p></p></div>");
				template.attr("data-show", namespace);
				template.find("h3").text(app.name);
				template.find("p").text(app.description);
				template.css({
					"background-color": app.colour,
					"border-color": app.colour
				});
				template.appendTo(".wpmarketing .home");
			
				if (app.premium) {
					if (coming_soon != "") { coming_soon = " - Coming Soon!" }
					$("<li><strong>" + app.name + coming_soon + "</strong><p class=\"description\">" + app.description + "</p></li>").appendTo("[data-app-list]");
				}
			});
			
			if ($(".wpmarketing").hasClass("unlocked")) {
				$(".wpmarketing .app_icon[data-show='upgrade'], .wpmarketing [data-show-for='upgrade']").remove();
			}
			
			window.LandingPager.init();
			
			if (window.location.hash.indexOf("apps/") != -1) {
				$(window).trigger("hashchange");
			}
		}
	}
	
	$(window).on('hashchange', function() {
		var hash = window.location.hash.split("/");
		if (typeof hash[hash.length - 1] != "undefined") {
			window.WPMarketing.setApp(hash[hash.length - 1]);	
		} else {
			window.WPMarketing.setApp("home");	
		}
	});
	
	$(document).on("click", ".wpmarketing [data-show], .wpmarketing [data-change-unlock-code]", function() {
		var namespace = $(this).attr("data-show");
		if (typeof namespace == "undefined") { namespace = "upgrade"; }
		window.location.hash = "!/apps/" + namespace;
		return false;
	});
	
	$(document).on("click", ".wpmarketing .app .go_home", function() {
		window.location.hash = "!/apps/home"
		return false;
	});
	
	$(document).on("click", ".wpmarketing .change_unlock_code", function() {
		$(".change_unlock_code_form").hide(150);
		$(".unlock_code_form").show(150);
		return false;
	});
	
	$(document).on("submit", ".unlock_code_form", function() {
		$(".unlock_code_form").find(".initial").hide(150);
		$(".unlock_code_form").find(".loading").show(150);

		$.post(ajaxurl, {
			action: "unlock",
			unlock_code: $(this).find("input[name='unlock_code']").val()
		}, function(response) {
			var json = JSON.parse(response);
			
			if (json.success == true) {
				$(".unlock_code_form").find(".loading").hide(150);
				$(".unlock_code_form").find(".success").show(150);
				$(".wpmarketing").removeClass("locked").addClass("unlocked");
				$(".unlock_code").text(json.unlock_code);
				$(".unlock_code_form").show()
				$(".change_unlock_code_form").hide();
				$(".wpmarketing .app_icon[data-show='upgrade'], .wpmarketing [data-show-for='upgrade']").remove();
				window.WPMarketing.unlocked = true;
			} else {
				alert("The unlock code you provided was invalid.");
				$(".unlock_code_form").find(".loading").hide(150);
				$(".unlock_code_form").find(".initial").show(150);
			}
		});
		return false;
	});
	
	if ($(".wpmarketing").length) {
		window.WPMarketing.init();
	}
});