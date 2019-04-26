sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/UIComponent' ], function(
		jQuery, UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.myApps.Component", {
		metadata : {
			manifest : "json",
			config : {
				"titleResource" : "partner",
				"resourceBundle" : "i18n/i18n.properties",
				"favIcon" : ".Icon/favicon.ico",
			},
		},
		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
		},

	});
	return Component;
});
