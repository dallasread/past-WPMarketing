jQuery(function($) {
	window.ConvertAlert = {
		events: [],
		last_event_id: 0,
		map: false,
		markers: [],
		
		init: function() {
			window.ConvertAlert.addGoogle();
			
			if ($(".wpmarketing .convert_alert_status").hasClass("on")) {
				window.ConvertAlert.addToList();
				window.ConvertAlert.poll();
			}
		},
		
		pause: function() {
			clearTimeout(window.ConvertAlert.addToLister);
			clearTimeout(window.ConvertAlert.poller);
		},
		
		destroy: function() {
			window.ConvertAlert.pause();
			window.ConvertAlert.events = [];
		},
		
		poll: function() {
			$.post(ajaxurl, {
				action: "convert_alert_poll",
				last_event_id: window.ConvertAlert.last_event_id
			}, function(response) {
				var events = JSON.parse(response);

				events.forEach(function(event) {
					window.ConvertAlert.events.push(event);
					window.ConvertAlert.last_event_id = event.id
				});

				window.ConvertAlert.poller = setTimeout(window.ConvertAlert.poll, 10000);
			});
		},
		
		addToList: function() {
			if (window.ConvertAlert.events.length) {
				var event = window.ConvertAlert.events.shift();
				var template = $("#wpmarketing_convert_alert_event_template").html();
				var description_data = event;
				description_data.visitor.name = "<a href=\"#\" class=\"show_in_thickbox\" data-model=\"visitor\" data-id=\"" + event.visitor.id + "\">" + event.visitor.name + "</a>";
				description_data.page.title = "<a href=\"" + event.page.url + "\" target=\"_blank\">" + event.page.title + "</a>";
				event.description = Mustache.render(event.description, description_data);
				var html = Mustache.render(template, event);
				
				window.ConvertAlert.markers.push(new google.maps.Marker({
			    position: new google.maps.LatLng(event.visitor.latitude, event.visitor.longitude),
			    map: window.ConvertAlert.map,
			    title: "Hello World!"
				}));
				
				$("[data-app='convert_alert'] .newsfeed .loading").hide();
				$(html).prependTo("[data-app='convert_alert'] .newsfeed").hide().fadeIn();
			}
			
			window.ConvertAlert.addToLister = setTimeout(window.ConvertAlert.addToList, 3500);
		},
		
		addGoogle: function() {
			if (typeof google == "undefined") {
			  var script = document.createElement("script");
			  script.type = "text/javascript";
				script.id = "google-maps-script";
			  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&" + "callback=window.ConvertAlert.drawMap";
			  document.body.appendChild(script);
			} else {
				if (window.ConvertAlert.map === false) {
					window.ConvertAlert.drawMap();
				}
			}
		},
		
		drawMap: function() {
		  window.ConvertAlert.map = new google.maps.Map(document.getElementById("convert_alert_map"), {
		    zoom: 2,
		    center: new google.maps.LatLng(30, -10),
			  mapTypeId: google.maps.MapTypeId.TERRAIN,
				panControl: true,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
			  zoomControl: true,
		    zoomControlOptions: {
		      style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.TOP_RIGHT
		    },
			  mapTypeControl: false,
			  scaleControl: false,
			  streetViewControl: false,
			  overviewMapControl: false
		  });
		}
	}
	
	$(document).on("click", ".wpmarketing .convert_alert_status", function() {
		var new_status = $(this).hasClass("on") ? "off" : "on";
		$(this).toggleClass("on").toggleClass("off");
		
		$.post(ajaxurl, {
			action: "convert_alert_status",
			convert_alert_status: new_status
		});
		
		if (new_status == "on") {
			window.ConvertAlert.init();
		} else {
			window.ConvertAlert.pause();
		}
		
		return false;
	});
	
	$(document).on("click", ".wpmarketing .show_in_thickbox", function() {
		// PAUSE
		tb_show("Visitor Profile", "#TB_inline?height=425&width=450&inlineId=sway_page_content_editor", null);
		// UNPAUSE ON CLOSE
		return false;
	});
	
	$(document).on("click", ".wpmarketing .newsfeed a", function() {
		if (!$(this).hasClass("show_in_thickbox")) {
			window.open($(this).attr("href"), "_blank");
			return false;
		}
	});

});