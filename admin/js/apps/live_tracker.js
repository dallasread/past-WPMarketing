jQuery(function($) {
	window.LiveTracker = {
		events: [],
		last_event_id: 0,
		map: false,
		markers: [],
		
		init: function() {
			window.LiveTracker.addGoogle();
			
			if ($(".wpmarketing .live_tracker_status").hasClass("on")) {
				window.LiveTracker.addToList();
				window.LiveTracker.poll();
			}
		},
		
		pause: function() {
			clearTimeout(window.LiveTracker.addToLister);
			clearTimeout(window.LiveTracker.poller);
		},
		
		destroy: function() {
			window.LiveTracker.pause();
			window.LiveTracker.events = [];
		},
		
		poll: function() {
			$.post(ajaxurl, {
				action: "live_tracker_poll",
				unlock_code: $(this).find("input[name='unlock_code']").val(),
				last_event_id: window.LiveTracker.last_event_id
			}, function(response) {
				var contacts = JSON.parse(response);

				contacts.forEach(function(event) {
					window.LiveTracker.events.push(event);
					window.LiveTracker.last_event_id = event.id
				});

				window.LiveTracker.poller = setTimeout(window.LiveTracker.poll, 10000);
			});
		},
		
		addToList: function() {
			if (window.LiveTracker.events.length) {
				var event = window.LiveTracker.events.shift();
				var template = $("#wpmarketing_live_tracker_event_template").html();
				var html = Mustache.render(template, event);
				
				window.LiveTracker.markers.push(new google.maps.Marker({
			    position: new google.maps.LatLng(event.contact.latitude, event.contact.longitude),
			    map: window.LiveTracker.map,
			    title: "Hello World!"
				}));
				
				$("[data-app='live_tracker'] .newsfeed .loading").hide();
				$(html).prependTo("[data-app='live_tracker'] .newsfeed").hide().fadeIn();
			}
			
			window.LiveTracker.addToLister = setTimeout(window.LiveTracker.addToList, 3500);
		},
		
		addGoogle: function() {
			if (typeof google == "undefined") {
			  var script = document.createElement("script");
			  script.type = "text/javascript";
				script.id = "google-maps-script";
			  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&" + "callback=window.LiveTracker.drawMap";
			  document.body.appendChild(script);
			} else {
				if (window.LiveTracker.map === false) {
					window.LiveTracker.drawMap();
				}
			}
		},
		
		drawMap: function() {
		  window.LiveTracker.map = new google.maps.Map(document.getElementById("live_tracker_map"), {
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
	
	$(document).on("click", ".wpmarketing .live_tracker_status", function() {
		var new_status = $(this).hasClass("on") ? "off" : "on";
		$(this).toggleClass("on").toggleClass("off");
		
		$.post(ajaxurl, {
			action: "live_tracker_status",
			live_tracker_status: new_status
		});
		
		if (new_status == "on") {
			window.LiveTracker.init();
		} else {
			window.LiveTracker.pause();
		}
		
		return false;
	});
	
	$(document).on("click", ".show_in_thickbox", function() {
		tb_show("Contact Profile", "http://dallasread.com", null);
		return false;
	});

});