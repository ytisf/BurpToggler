var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var toggle_state = 0;

var button = buttons.ActionButton({
  id: "toggel-burp",
  label: "Toggel Burp",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	console.log("you just clicked a button!");
	var ip = "127.0.0.1";
	var port = 8080;
	var ports_array = ["network.proxy.http_port","network.proxy.socks_port","network.proxy.ssl_port","network.proxy.ftp_port"];
	var names_host = ["network.proxy.http","network.proxy.socks", "network.proxy.ssl", "network.proxy.ftp"];
	var bools_names = ["network.http.proxy.pipelining","network.proxy.share_proxy_settings"];
	var int_names = ["network.proxy.type"];
	console.log(toggle_state);
	if (toggle_state == 0){
		console.log("I'm at state == 0");
		// Will change all proxy ports to 8080
		for (var i = 0; i < ports_array.length; i++) {
			require("sdk/preferences/service").set(ports_array[i], port);
		}
		// Will change all proxy hosts to 127.0.0.1
		for (var i = 0; i < names_host.length; i++) {
			require("sdk/preferences/service").set(names_host[i], ip);
		}
		// Will change proxy values to on
		for (var i = 0; i < bools_names.length; i++) {
			require("sdk/preferences/service").set(bools_names[i], true);
		}
		for (var i = 0; i < int_names.length; i++) {
			require("sdk/preferences/service").set(int_names[i], 1);
		}
		// Set proxy mode back to OS default
		require("sdk/preferences/service").set("network.proxy.type", 1);
		// change button icon
		toggle_state = 1;
	}
	else if (toggle_state == 1){
		console.log("I'm at state == 1");
		// Set proxy mode back to OS default
		require("sdk/preferences/service").set("network.proxy.type", 5);
		for (var i = 0; i < ports_array.length; i++) {
			require("sdk/preferences/service").set(ports_array[i], 0);
		}
		for (var i = 0; i < names_host.length; i++) {
			require("sdk/preferences/service").set(names_host[i], "");
		}
		for (var i = 0; i < bools_names.length; i++) {
			require("sdk/preferences/service").set(bools_names[i], false);
		}
		for (var i = 0; i < int_names.length; i++) {
			require("sdk/preferences/service").set(int_names[i], 0);
		}
		toggle_state = 0;
	}
}
